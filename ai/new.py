

import requests
import json
import os

# ---------------------------
# CONFIGURATION
# ---------------------------
API_KEY = os.getenv("PERPLEXITY_API_KEY")
API_URL = "https://api.perplexity.ai/chat/completions"
MODEL_NAME = "sonar-pro"  # Use a chat-friendly model

# ---------------------------
# HELPER FUNCTION
# ---------------------------
def get_response(user_message):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    # Give the model instructions to respond short, friendly, supportive
    system_prompt = (
        "You are a friendly supportive chatbot. "
        "Always respond like a helpful friend in 2-3 short sentences. "
        "Be encouraging, kind, and easy to talk to."
    )

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]
    }

    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        answer = data["choices"][0]["message"]["content"]
        return answer

    except requests.exceptions.HTTPError as e:
        return f"⚠️ HTTP Error: {e} - {response.text}"
    except requests.exceptions.RequestException as e:
        return f"⚠️ Request Error: {e}"
    except KeyError:
        return f"⚠️ Unexpected response format: {json.dumps(data, indent=2)}"

# ---------------------------
# MAIN CHAT LOOP
# ---------------------------
def main():
    print("🤖 Friendly Chatbot (type 'quit' to exit)\n")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["quit", "exit"]:
            print("Chatbot: Bye! Take care! 🕊")
            break

        reply = get_response(user_input)
        print(f"Chatbot: {reply}\n")

if __name__ == "__main__":
    main()

