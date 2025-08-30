import requests
import json

class ValidatorAgent:
    def __init__(self, api_key: str, file_path: str):
        self.api_key = api_key
        self.file_path = file_path
        self.text_data = self._load_text()

    def _load_text(self) -> str:
        """Load preprocessed text (from ProcessorAgent output file)."""
        with open(self.file_path, "r", encoding="utf-8") as f:
            return f.read().strip()

    def _analyze_competitors(self) -> tuple[float, list]:
        """Analyze competitors to get average similarity and top competitors."""
        from .scraper_agent import ScraperAgent
        
        # Get competitor analysis first
        scraper = ScraperAgent(self.api_key, self.file_path)
        competitors_json = scraper.query_mistral()
        
        try:
            data = json.loads(competitors_json)
            if "similar_ideas" in data:
                competitors = data["similar_ideas"]
                # Calculate average similarity
                similarities = [comp.get("similarity", 0) for comp in competitors]
                avg_similarity = sum(similarities) / len(similarities) if similarities else 0
                # Get top 3 most similar competitors
                top_competitors = sorted(competitors, key=lambda x: x.get("similarity", 0), reverse=True)[:3]
                return avg_similarity, top_competitors
        except:
            pass
        
        return 0, []

    def query_mistral(self) -> str:
        """
        Validate the product idea using Mistral-7B and COSTAR framework.
        Returns structured JSON with validation scores.
        """
        # First analyze competitors
        avg_similarity, top_competitors = self._analyze_competitors()
        
        # Convert competitor info to string for context
        competitor_context = "\n".join([
            f"- {comp['idea_name']}: {comp['idea_description']} (Similarity: {comp.get('similarity', 0)}%)"
            for comp in top_competitors
        ])

        url = "https://openrouter.ai/api/v1/chat/completions"

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        # Detailed COSTAR prompt
        prompt = f"""
        Use the COSTAR framework to validate the following startup idea.

        C (Context): 
        The user has provided a startup idea. 
        Your task is to evaluate its real-world potential across multiple key dimensions.
        
        Input Idea: "{self.text_data}"
        
        Competitor Analysis:
        Average Similarity with Competitors: {avg_similarity}%
        Top Similar Competitors:
        {competitor_context}

        O (Objective): 
        Provide a **quantitative validation** of the idea based on competitor analysis:
        
        - Uniqueness: Score INVERSELY based on competitor similarity
          * If avg similarity > 80%: Score 1-3 (very similar to existing solutions)
          * If avg similarity 60-80%: Score 3-5 (somewhat similar)
          * If avg similarity 40-60%: Score 5-7 (moderately unique)
          * If avg similarity < 40%: Score 7-10 (highly unique)
        
        - Market Opportunity: Score INVERSELY based on number of similar competitors
          * Many very similar competitors (>3): Score 1-4 (saturated market)
          * Few similar competitors (1-3): Score 4-7 (competitive but with space)
          * No direct competitors: Score 7-10 (blue ocean opportunity)
        
        - Feasibility: Score based on:
          * Technical complexity relative to existing solutions
          * Resource requirements
          * Implementation challenges
        
        - Market Trend & Timing: Consider
          * Current market direction
          * Technology readiness
          * User readiness for the solution
        
        - Scalability: Evaluate
          * Growth potential
          * Market size
          * Expansion possibilities
        
        - Problem Relevance: Assess
          * Pain point severity
          * Target market size
          * Urgency of the solution

        S (Style): 
        - Use structured analysis, be concise and clear.
        - Focus on providing scores rather than long paragraphs.
        - Keep each score strictly numeric (0–10).

        T (Tone): 
        Professional, objective, and evaluation-focused.
        Avoid exaggeration or marketing tone.

        A (Audience): 
        Startup founders, product managers, and investors looking to validate startup ideas.

        R (Response): 
        Return output in strict JSON format:
        {{
          "validation_scores": {{
            "uniqueness": <score_out_of_10>,
            "feasibility": <score_out_of_10>,
            "market_trend": <score_out_of_10>,
            "scalability": <score_out_of_10>,
            "problem_relevance": <score_out_of_10>,
            "user_adoption_potential": <score_out_of_10>
          }},
          "overall_score": <total_score_out_of_100>
        }}

        Rules:
        - Base uniqueness and market_trend scores INVERSELY on competitor similarity
        - Higher similarity = LOWER uniqueness score
        - Higher similarity = LOWER market opportunity score
        - Each attribute must have an integer score from 0 to 10
        - "overall_score" must be the sum of all attributes, out of 100
        - Do not include explanations, only return JSON
        - Ensure scores reflect the competitive landscape accurately
        """

        data = {
            "model": "mistralai/mistral-7b-instruct",
            "messages": [
                {"role": "system", "content": "You are a startup validation assistant."},
                {"role": "user", "content": prompt}
            ]
        }

        response = requests.post(url, headers=headers, data=json.dumps(data))

        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            raise Exception(f"Error: {response.status_code}, {response.text}")


if __name__ == "__main__":
    api_key = "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"  
    file_path = r"S:\ThinkBot-new\backend\text_files\ecommerce.txt"  

    agent = ValidatorAgent(api_key, file_path)
    validation_result = agent.query_mistral()

    print("\n=== Validation Result (COSTAR JSON) ===\n")
    print(validation_result)
