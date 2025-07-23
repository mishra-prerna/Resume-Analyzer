import pdfminer.high_level
import docx
import re

# 🔥 Predefined skills set (you can extend this list)
SKILL_SET = {"Java", "Python", "React", "AI", "ML", "Flask", "Django", "TensorFlow", "JavaScript", "C++", "SQL"}

def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF file using pdfminer."""
    text = pdfminer.high_level.extract_text(pdf_path)
    text = re.sub(r'\s+', ' ', text).strip()  # Normalize spaces
    return text

def extract_text_from_docx(docx_path):
    """Extracts text from a DOCX file using python-docx."""
    doc = docx.Document(docx_path)
    return "\n".join([para.text.strip() for para in doc.paragraphs if para.text.strip()])

def extract_name(text):
    """Extracts the first non-empty line as the candidate's name (fallback approach)."""
    lines = text.split("\n")
    for line in lines:
        cleaned_line = line.strip()
        if cleaned_line and not re.search(r'\d', cleaned_line):  # Avoid lines with numbers
            return cleaned_line
    return "Unknown"

def extract_email(text):
    """Extracts email from text using regex."""
    match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
    return match.group(0) if match else "Unknown"

def extract_phone(text):
    """Extracts phone numbers (including international formats)."""
    match = re.search(r'\+?\d{1,4}?[-.\s]?\(?\d{2,5}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}', text)
    return match.group(0) if match else "Unknown"

def extract_skills(text):
    """Extracts skills dynamically from a predefined set."""
    found_skills = set()
    for skill in SKILL_SET:
        if re.search(rf'\b{re.escape(skill)}\b', text, re.IGNORECASE):
            found_skills.add(skill.capitalize())  # Capitalize for consistency
    return list(found_skills) if found_skills else ["None Detected"]

def parse_resume(file_path):
    """Parses a resume (PDF or DOCX) and extracts key details."""
    if file_path.endswith(".pdf"):
        text = extract_text_from_pdf(file_path)
    elif file_path.endswith(".docx"):
        text = extract_text_from_docx(file_path)
    else:
        return {"error": "Unsupported file format"}

    return {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text)
    }

# 🔥 Example Usage:
if __name__ == "__main__":
    resume_data = parse_resume("sample_resume.pdf")  # Change to your file path
    print(resume_data)
