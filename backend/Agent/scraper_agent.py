import requests
import json



class ScraperAgent:
    def __init__(self, api_key: str, file_path: str):
        self.api_key = api_key
        self.file_path = file_path
        self.text_data = self._load_text()

    def _load_text(self) -> str:
        """Load preprocessed text (from ProcessorAgent output file)."""
        with open(self.file_path, "r", encoding="utf-8") as f:
            return f.read().strip()
            
    def _get_category(self, description: str) -> str:
        """Determine the category based on the description."""
        description = description.lower()
        
        categories = {
            'E-commerce': ['shop', 'retail', 'store', 'marketplace', 'commerce', 'sell'],
            'FinTech': ['payment', 'finance', 'bank', 'invest', 'money', 'trading'],
            'EdTech': ['education', 'learn', 'teach', 'student', 'school', 'course'],
            'HealthTech': ['health', 'medical', 'wellness', 'fitness', 'doctor', 'patient'],
            'AI/ML': ['ai', 'machine learning', 'artificial intelligence', 'predict', 'automate'],
            'SaaS': ['software', 'platform', 'service', 'cloud', 'subscription'],
            'Enterprise': ['business', 'enterprise', 'corporate', 'company', 'organization'],
            'Consumer': ['user', 'consumer', 'personal', 'individual', 'customer'],
            'Mobile': ['app', 'mobile', 'phone', 'ios', 'android'],
            'IoT': ['iot', 'device', 'sensor', 'hardware', 'smart home']
        }
        
        # Find the category with the most keyword matches
        max_matches = 0
        best_category = 'General'
        
        for category, keywords in categories.items():
            matches = sum(1 for keyword in keywords if keyword in description)
            if matches > max_matches:
                max_matches = matches
                best_category = category
        
        return best_category

    def query_mistral(self) -> str:
        """
        Send preprocessed product idea text to OpenRouter Mistral-7B
        and get YC competitor startups using COSTAR framework with similarity scores.
        """
        url = "https://openrouter.ai/api/v1/chat/completions"

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        
        prompt = f"""
        Use the COSTAR framework to analyze and suggest similar startup ideas.

        C (Context): 
        The user has a product idea and wants to explore similar startups from Y Combinator.
        The input idea has already been preprocessed for clarity.
        Input Idea: "{self.text_data}"

        O (Objective): 
        Identify 10 real competitors or highly similar ideas from Y Combinator’s startup directory.
        Each result must include:
        - idea_name: Name of the startup
        - idea_description: Simple, clear explanation of what they actually do (one or two lines max).

        S (Style): 
        Keep the results structured, concise, and easy to read. 
        Avoid long paragraphs. Stick to factual summaries.

        T (Tone): 
        Professional, informative, and startup-research oriented. 
        Avoid marketing fluff, use neutral descriptive tone.

        A (Audience): 
        Startup founders, students, and innovators who want to understand competitors 
        or validate their idea against real YC companies.

        R (Response): 
        Return output in strict JSON format with a list of objects.
        Each object must contain:
        - "idea_name"
        - "idea_description"

        Example JSON structure:
        {{
          "similar_ideas": [
            {{
              "idea_name": "Startup X",
              "idea_description": "Helps users track expenses automatically using AI."
            }},
            {{
              "idea_name": "Startup Y",
              "idea_description": "Provides a platform for farmers to sell produce directly to consumers."
            }}
          ]
        }}

        Now, based on the given user idea, return exactly 10 similar startup ideas in this JSON format.
        """

        data = {
            "model": "mistralai/mistral-7b-instruct",
            "messages": [
                {"role": "system", "content": "You are a startup competitor research agent."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7  # Add some variation but keep it realistic
        }

        response = requests.post(url, headers=headers, data=json.dumps(data))

        if response.status_code == 200:
            response_content = response.json()["choices"][0]["message"]["content"]
            try:
                # Parse and validate the response
                data = json.loads(response_content)
                if "similar_ideas" in data:
                    for i, idea in enumerate(data["similar_ideas"]):
                        # Calculate base similarity based on position (first results are more similar)
                        base_similarity = max(85 - (i * 10), 25)  # Decreases by 10% each time, min 25%
                        
                        # Add some controlled randomness (-5 to +5)
                        import random
                        variation = random.uniform(-5, 5)
                        
                        # Set final similarity score
                        similarity = max(1, min(100, base_similarity + variation))
                        
                        # Update idea with calculated similarity and ensure category
                        idea["similarity"] = round(similarity)
                        idea["category"] = idea.get("category", self._get_category(idea["idea_description"]))
                    return json.dumps(data)
            except Exception as e:
                print(f"Error parsing response: {e}")
            return response_content
        else:
            raise Exception(f"Error: {response.status_code}, {response.text}")



if __name__ == "__main__":
    api_key = "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"  
    file_path = r"S:\ThinkBot-new\backend\text_files\ecommerce.txt"  

    agent = ScraperAgent(api_key, file_path)
    competitors = agent.query_mistral()

    print("\n=== Competitors (COSTAR JSON) ===\n")
    print(competitors)