import os
import re
import logging
import spacy
import phonenumbers
from pdfminer.high_level import extract_text
from docx import Document
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.ai_analysis import analyze_resume_with_ai  # Custom AI module

# ✅ Initialize Flask app
app = Flask(__name__)

# ✅ Enable CORS for frontend
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

# ✅ File upload configuration
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {'pdf', 'docx'}

# ✅ Configure logging
logging.basicConfig(level=logging.DEBUG)

# ✅ Load spaCy Model
try:
    nlp = spacy.load('en_core_web_sm')
except OSError:
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load('en_core_web_sm')

# ✅ Helper function to check file extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ✅ Extract text from PDF
def extract_text_from_pdf(file_path):
    try:
        return extract_text(file_path)
    except Exception as e:
        logging.error(f"Error extracting text from PDF: {e}")
        return ""

# ✅ Extract text from DOCX
def extract_text_from_docx(file_path):
    try:
        doc = Document(file_path)
        return "\n".join([p.text for p in doc.paragraphs])
    except Exception as e:
        logging.error(f"Error extracting text from DOCX: {e}")
        return ""

# ✅ Extract email using regex
def extract_email(text):
    email_pattern = r"[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+"
    emails = re.findall(email_pattern, text)
    return emails[0] if emails else "N/A"

# ✅ Extract phone number using phonenumbers
def extract_phone(text):
    for match in phonenumbers.PhoneNumberMatcher(text, "IN"):
        return phonenumbers.format_number(match.number, phonenumbers.PhoneNumberFormat.INTERNATIONAL)
    return "N/A"

# ✅ Advanced skill extraction using NLP & regex
def extract_skills(text):
    skills_list = [
        "Python", "Java", "C++", "Machine Learning", "Deep Learning", "NLP",
        "React", "Angular", "Django", "Flask", "TensorFlow", "Pytorch",
        "SQL", "NoSQL", "MongoDB", "AWS", "Azure", "GCP", "Docker", "Kubernetes"
    ]
    
    # Extract skills using regex & NLP
    extracted_skills = set()
    text_lower = text.lower()
    
    for skill in skills_list:
        if skill.lower() in text_lower:
            extracted_skills.add(skill)
    
    # NLP-based skill extraction
    doc = nlp(text)
    for token in doc:
        if token.ent_type_ == "ORG" or token.ent_type_ == "PRODUCT":
            extracted_skills.add(token.text)
    
    return list(extracted_skills)

# ✅ Extract name using spaCy
def extract_name(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return "N/A"

# ✅ AI-based Resume Analysis (Strengths & Weaknesses)
def analyze_resume(parsed_data):
    skills = parsed_data.get("skills", [])

    if not skills:
        return {
            "strengths": "No strong skills detected.",
            "weaknesses": "Your resume lacks clear skill mentions. Consider adding more details."
        }

    ai_feedback = analyze_resume_with_ai(skills)  # Custom AI function
    
    # Ensure ai_feedback is a dictionary
    if isinstance(ai_feedback, dict):
        return {
            "strengths": ai_feedback.get("strengths", "Not detected"),
            "weaknesses": ai_feedback.get("weaknesses", "No weaknesses detected"),
        }
    
    return {
        "strengths": "AI analysis failed. Please try again.",
        "weaknesses": "Could not determine weaknesses."
    }

# ✅ Resume Upload & Analysis API
@app.route('/upload', methods=['POST'])
def upload_file():
    logging.debug(f"Received request: {request.method} {request.url}")
    
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Unsupported file format. Please upload a PDF or DOCX file."}), 400

    logging.debug(f"Processing file: {file.filename}")

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    try:
        # ✅ Extract Text
        text = extract_text_from_pdf(file_path) if file.filename.endswith('.pdf') else extract_text_from_docx(file_path)

        if not text:
            raise ValueError("Failed to extract text from resume.")

        # ✅ Extract Key Resume Information
        parsed_data = {
            "name": extract_name(text),
            "email": extract_email(text),
            "phone": extract_phone(text),
            "skills": extract_skills(text),
        }

        # ✅ AI-Based Analysis
        analysis_result = analyze_resume(parsed_data)

        return jsonify({
            "filename": file.filename,
            "analysis": parsed_data,
            "ai_analysis": analysis_result
        })

    except Exception as e:
        logging.error(f"Error processing resume: {str(e)}", exc_info=True)
        return jsonify({"error": f"Failed to process resume: {str(e)}"}), 500

# ✅ Fetch Analysis Results API
@app.route('/analysis', methods=['POST'])
def get_analysis():
    data = request.get_json()

    if not data or "fileName" not in data:
        return jsonify({"error": "Invalid request. 'fileName' is required."}), 400

    file_name = data["fileName"]
    file_path = os.path.join(UPLOAD_FOLDER, file_name)

    if not os.path.exists(file_path):
        return jsonify({"error": "File not found. Please upload first."}), 404

    try:
        text = extract_text_from_pdf(file_path) if file_name.endswith('.pdf') else extract_text_from_docx(file_path)

        if not text:
            return jsonify({"error": "Failed to extract text."}), 500

        parsed_data = {
            "name": extract_name(text),
            "email": extract_email(text),
            "phone": extract_phone(text),
            "skills": extract_skills(text),
        }

        analysis_result = analyze_resume(parsed_data)

        return jsonify({
            "filename": file_name,
            "analysis": parsed_data,
            "ai_analysis": analysis_result
        })

    except Exception as e:
        logging.error(f"Error retrieving analysis: {str(e)}", exc_info=True)
        return jsonify({"error": f"Error retrieving analysis: {str(e)}"}), 500

# ✅ Health check API
@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Resume Analyzer Backend is Running!"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
