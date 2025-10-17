from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Allow requests from your React frontend

API_KEY = os.getenv("PERPLEXITY_API_KEY")
API_URL = "https://api.perplexity.ai/chat/completions"
MODEL_NAME = "sonar-pro"

def get_response(user_message):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

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

    response = requests.post(API_URL, headers=headers, json=payload)
    response.raise_for_status()
    data = response.json()
    return data["choices"][0]["message"]["content"]

@app.route("/api/chat", methods=["POST"])
def chat():
    user_data = request.get_json()
    user_message = user_data.get("message", "")
    try:
        ai_reply = get_response(user_message)
        return jsonify({"reply": ai_reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)
