import { useState, useEffect } from "react";
import { Typography, Button, Box, Paper, Snackbar, Alert } from "@mui/material";
import { CloudUpload, PictureAsPdf, Description } from "@mui/icons-material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const UploadResume = () => {
  const navigate = useNavigate();  
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bgImage, setBgImage] = useState(""); // 🎨 Store background image

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/random?query=resume,technology&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        setBgImage(response.data.urls.full); // 🎯 Set background image URL
      } catch (error) {
        console.error("❌ Failed to fetch background image:", error);
      }
    };

    fetchBackgroundImage();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "application/pdf" || file.type.includes("word"))) {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Please upload a valid PDF or DOCX file.");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Upload Success:", response.data);
      setSuccess(true);
      setError("");
      navigate("/result", { state: { fileName: selectedFile.name } });

    } catch (error) {
      console.error("❌ Upload Failed:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Image Selection
  const getFileIcon = () => {
    if (!selectedFile) {
      return "https://cdn-icons-png.flaticon.com/512/2983/2983066.png"; // Default upload icon
    }
    if (selectedFile.type === "application/pdf") {
      return "https://cdn-icons-png.flaticon.com/512/337/337946.png"; // PDF Icon
    }
    if (selectedFile.type.includes("word")) {
      return "https://cdn-icons-png.flaticon.com/512/732/732220.png"; // DOCX Icon
    }
    return "https://cdn-icons-png.flaticon.com/512/2983/2983066.png"; // Fallback icon
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundImage: bgImage ? `url(${bgImage})` : "none", // 🌄 Dynamic Background
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(5px)",
      }}
    >
      <Header />
      <Box
        sx={{
          minHeight: "85vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 5,
            width: "100%",
            maxWidth: 550,
            textAlign: "center",
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.2)", // Transparent Glass Effect
            backdropFilter: "blur(12px)",
            boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {/* Upload Illustration */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img
              src={getFileIcon()}
              alt="Upload Illustration"
              width="120"
              style={{ opacity: 0.9 }}
            />
          </Box>

          {/* Title */}
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff" }} gutterBottom>
            Upload Your Resume
          </Typography>

          {/* Description */}
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)", mb: 3 }}>
            Get AI-powered analysis & feedback on your resume. Upload a PDF or DOCX file to get started.
          </Typography>

          {/* File Input */}
          <Box sx={{ my: 3 }}>
            <input
              accept=".pdf,.doc,.docx"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="upload-button"
            />
            <label htmlFor="upload-button">
              <Button
                variant="contained"
                color="secondary"
                component="span"
                startIcon={<CloudUpload />}
                sx={{
                  py: 1.5,
                  px: 3,
                  fontSize: "1rem",
                  transition: "0.3s",
                  backgroundColor: "#ff7043",
                  "&:hover": { backgroundColor: "#ff5722", transform: "scale(1.05)" },
                }}
              >
                Choose File
              </Button>
            </label>
          </Box>

          {/* Selected File Name */}
          {selectedFile && (
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                color: "rgba(255,255,255,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              {selectedFile.type === "application/pdf" ? <PictureAsPdf color="error" /> : <Description color="primary" />}
              <strong>{selectedFile.name}</strong>
            </Typography>
          )}

          {/* Error Message */}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          {/* Upload Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              py: 1.5,
              px: 4,
              fontSize: "1rem",
              transition: "0.3s",
              backgroundColor: "#1e88e5",
              "&:hover": { backgroundColor: "#1976d2", transform: "scale(1.05)" },
            }}
            disabled={!selectedFile || loading}
            onClick={handleUpload}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </Paper>
      </Box>

      <Footer />

      {/* Success Snackbar */}
      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Resume uploaded successfully!</Alert>
      </Snackbar>
    </Box>
  );
};

export default UploadResume;
