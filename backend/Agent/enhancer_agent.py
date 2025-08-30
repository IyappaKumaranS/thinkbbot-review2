import json
import requests
from .scraper_agent import ScraperAgent

class EnhancerAgent:
    def __init__(self, api_key: str, idea_file_path: str):
        self.api_key = api_key
        self.idea_file_path = idea_file_path
        self.model = "mistralai/mistral-7b-instruct"

    def _load_idea(self) -> str:
        """Load user preprocessed idea text from file."""
        with open(self.idea_file_path, "r", encoding="utf-8") as f:
            return f.read().strip()

    def enhance_idea(self) -> str:
        """Get competitors via ScraperAgent, then suggest improvements."""
        
        idea_text = self._load_idea()

    
        scraper = ScraperAgent(self.api_key, self.idea_file_path)
        competitors_json = scraper.query_mistral()

        try:
            competitors = json.loads(competitors_json)["similar_ideas"]
        except Exception:
            competitors = []

        
        comp_str = "\n".join(
            [f"- {c['idea_name']}: {c['idea_description']}" for c in competitors]
        )

        context = f"""
User Idea:
{idea_text}

Competitors from Y Combinator:
{comp_str}

Task:
Based on the above competitor context, provide actionable, clear,
and realistic suggestions to improve the uniqueness and value of
the user’s idea. Avoid hallucinations. Focus only on insights
that are not already covered by the listed competitors.
"""

       
        url = "https://openrouter.ai/api/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        data = {
            "model": self.model,
            "temperature": 0.7,
            "messages": [
                {"role": "system", "content": "You are a startup mentor. Give only factual, actionable suggestions."},
                {"role": "user", "content": context},
            ],
        }

        resp = requests.post(url, headers=headers, json=data)

        if resp.status_code == 200:
            content = resp.json()["choices"][0]["message"]["content"].strip()
            
            # Clean up the response text
            # Remove any markdown list markers
            content = content.replace('*', '').replace('-', '')
            # Remove any numbering (1., 2., etc)
            lines = content.split('\n')
            cleaned_lines = []
            for line in lines:
                # Remove numbering and common prefixes
                line = line.strip()
                # Remove numbered lists (1., 2., etc)
                if line and line[0].isdigit():
                    line = '.'.join(line.split('.')[1:]).strip()
                # Remove any remaining special characters at start
                line = line.lstrip('.-●•○◆◇■□▪️▫️►→').strip()
                # Only add non-empty lines
                if line:
                    cleaned_lines.append(line)
            
            # Join back into text
            cleaned_content = '\n'.join(cleaned_lines)
            return cleaned_content
        else:
            return f"Error: {resp.status_code}, {resp.text}"
        


if __name__ == "__main__":
    API_KEY = "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"  
    idea_file = r"S:\ThinkBot-new\backend\text_files\ecommerce.txt"

    enhancer = EnhancerAgent(API_KEY, idea_file)
    suggestions = enhancer.enhance_idea()

    print("\n--- Suggestions to Improve Idea ---\n")
    print(suggestions)