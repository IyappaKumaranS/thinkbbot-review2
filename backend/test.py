import requests

# Endpoint URL
url = "http://127.0.0.1:8000/run-pipeline"

# Example payload (replace with your real values)
payload = {
    "api_key": "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",   # your actual API key
    "file_path": r"S:\ThinkBot-Review2\backend\files\ecommerce.txt"         # path to your test idea file
}

# Send POST request
response = requests.post(url, json=payload)

# Print response
print("Status Code:", response.status_code)
print("Response JSON:", response.json())
