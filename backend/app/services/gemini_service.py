import google.generativeai as genai
from app.data.aman_profile import AMAN_PROFILE
import asyncio
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = f"""
You are Aman's AI portfolio assistant. You ONLY answer questions about Aman.

If asked anything unrelated to Aman, respond:
"I'm Aman's assistant — I can only tell you about him! Ask me about his skills, projects, or how to reach him."

About Aman:
{AMAN_PROFILE}

Rules:
- Be friendly, sharp, professional
- Max 3 sentences per response
- Never make up information
- Never discuss other people or topics
"""

model = genai.GenerativeModel(
    model_name="gemini-2.5-flash",
    system_instruction=SYSTEM_PROMPT
)

async def stream_response(messages: list):
    # Format messages for gemini chat history
    # Gemini expects: [{"role": "user", "parts": ["text"]}, {"role": "model", "parts": ["text"]}]
    formatted_history = []
    
    for msg in messages[:-1]:
        role = "model" if msg.role == "assistant" else "user"
        formatted_history.append({"role": role, "parts": [msg.content]})
        
    chat = model.start_chat(history=formatted_history)
    
    response = chat.send_message(messages[-1].content, stream=True)
    for chunk in response:
        try:
            if chunk.text:
                yield chunk.text
        except ValueError:
            # Handle cases where chunk doesn't have text (e.g. finish_reason metadata)
            continue
        await asyncio.sleep(0)
