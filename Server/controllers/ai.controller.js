import axios from 'axios';

export const handleChat = async (req, res) => {
  const userMessage = req.body.message || "";
  
  const API_KEY = process.env.GROQ_API_KEY;
  if (!API_KEY) {
    console.warn("Missing GROQ_API_KEY environment variable. AI features disabled.");
    return res.status(500).json({ error: "Server is missing API key configuration." });
  }

  const API_URL = "https://api.groq.com/openai/v1/chat/completions";
  const MODEL_NAME = "llama-3.3-70b-versatile";

  const systemPrompt = (
    "You are a friendly supportive chatbot. " +
    "Always respond like a helpful friend in 2-3 short sentences. " +
    "Be encouraging, kind, and easy to talk to."
  );

  const payload = {
    model: MODEL_NAME,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ]
  };

  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const aiReply = response.data.choices[0].message.content;
    res.status(200).json({ reply: aiReply });
  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "AI communication failed." });
  }
};
