import os
import google.generativeai as genai
from dotenv import load_dotenv

# ✅ Load environment variables
load_dotenv()

# ✅ Google Gemini API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("❌ Missing Google Gemini API key! Set GEMINI_API_KEY in .env file.")

# ✅ Configure Google Gemini
genai.configure(api_key=GEMINI_API_KEY)

def analyze_resume_with_ai(skills):
    """Analyze resume skills using Google Gemini and provide structured feedback."""
    if not skills or skills == ["None Detected"]:
        return {"strengths": "No relevant skills found.", "weaknesses": "Consider adding more relevant skills."}

    skills_text = ", ".join(skills)
    prompt = f"""
    Analyze this resume based on the following skills: {skills_text}. 
    - Provide a brief summary of strengths.
    - List any weaknesses or areas of improvement.
    - Output should be in JSON format as: {{"strengths": "...", "weaknesses": "..."}}.
    """

    try:
        # ✅ Use Gemini Pro model
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)

        # ✅ Extract structured response
        import json
        ai_response = json.loads(response.text)  # Convert response to JSON

        # ✅ Validate AI response structure
        if isinstance(ai_response, dict) and "strengths" in ai_response and "weaknesses" in ai_response:
            return ai_response
        else:
            raise ValueError("Invalid response format from Gemini.")

    except Exception as e:
        return {
            "strengths": "AI analysis failed.",
            "weaknesses": f"Error: {str(e)}"
        }
