# AI-Powered Resume Analyzer

## 📌 Project Overview
The **AI-Powered Resume Analyzer** is a web application that allows users to upload resumes and receive automated analysis using AI-based Natural Language Processing (NLP). The system extracts key details, provides job-fit scores, and suggests improvements based on industry standards.

## 🚀 Features
- **Resume Parsing**: Extracts key details like name, email, skills, education, and experience.
- **AI-Powered Analysis**: Uses NLP to analyze resume quality and provide a job-fit score.
- **Job Matching**: Matches resumes with relevant job roles based on extracted skills.
- **Improvement Suggestions**: Provides feedback to enhance the resume.
- **Multi-Format Support**: Accepts PDF and DOCX formats.
- **User Authentication**: Sign-up/login to save resume analysis history.

## 🛠️ Tech Stack
### **Frontend** *(React + Vite)*  
- **React.js** (Fast development with Vite)  
- **React Router** (Seamless navigation)  
- **Redux Toolkit** (State management)  
- **Axios** (API integration)  
- **Material UI** (Modern UI components) 


### **Backend** *(Flask + Python)*  
- **Flask** (Lightweight REST API framework)  
- **Flask-CORS** (Cross-Origin Resource Sharing)  
- **Gemini API** (AI-powered resume analysis)  
- **PDFMiner & python-docx** (Resume parsing tools)  
- **TensorFlow / NLP Libraries** (Advanced text processing)  


## 🔧 Setup

### 1 Backend Setup
```sh
cd resume_analyzer_backend
pip install -r requirements.txt
python app.py  # Runs on http://127.0.0.1:5000
```

### 2 Frontend Setup
```sh
cd resume_analyzer_frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

## 🖥️ Pages Overview
- **Home Page**: Upload resumes, view past analyses.
- **Analysis Page**:Displays detailed extracted information from the uploaded resume such as contact info, skills, education, and work experience. Also shows the AI-generated job-fit score and actionable suggestions to improve the resume.
- **Login/Register**: User authentication.
- **Dashboard**: Manage saved resumes and job matches.
- **Job Matching Page**: View job recommendations based on AI-powered analysis.
- **Saved Resumes Page**: Access previously analyzed resumes and insights.
 

