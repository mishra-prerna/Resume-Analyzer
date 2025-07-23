import { useEffect, useState } from "react";
import { 
  Container, Typography, CircularProgress, Card, CardContent, Box, Divider, Alert, Button 
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AnalysisResult = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const fileName = location.state?.fileName || "Unknown";

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/analysis", { fileName });
        console.log("✅ Response from API:", response.data);
        setAnalysisData(response.data);
      } catch (err) {
        setError("⚠️ Failed to fetch analysis results. Please try again.");
        console.error("❌ Error fetching analysis:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [fileName]); 

  return (
    <>
      <Header />
      <Box
        sx={{  
          minHeight: "96vh",
          width: "98vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #283E51, #4B79A1)",
          px: 2,
          py: 5,
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "100%" 
          }}
        >
          {loading ? (
            <CircularProgress color="inherit" />
          ) : error ? (
            <Alert 
              severity="error" 
              sx={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "bold", width: "100%" }}
            >
              {error}
            </Alert>
          ) : (
            <Card 
              sx={{ 
                width: "95vw",
                maxWidth: "850px",
                p: 4, 
                boxShadow: "0px 10px 30px rgba(0,0,0,0.3)", 
                borderRadius: 4, 
                backgroundColor: "white",
                textAlign: "center",
                animation: "fadeIn 0.8s ease-in-out",
              }}
            >
              <CardContent>
                {/* Resume Name */}
                <Typography 
                  variant="h5" 
                  color="textSecondary" 
                  fontWeight="bold" 
                  sx={{ mb: 2 }}
                >
                  📝 Resume: {fileName}
                </Typography>

                <Divider sx={{ my: 2, bgcolor: "#ddd" }} />

                {/* User Details */}
                <Typography 
                  variant="h6" 
                  color="primary" 
                  fontWeight="bold" 
                  sx={{ mt: 2, textTransform: "uppercase" }}
                >
                  👤 User Details
                </Typography>
                <Typography sx={{ fontSize: "1.1rem", mt: 1 }}>
                  <strong>Name:</strong> {analysisData?.analysis?.name || "Not available"}
                </Typography>
                <Typography sx={{ fontSize: "1.1rem", mt: 1 }}>
                  <strong>Email:</strong> {analysisData?.analysis?.email || "Not available"}
                </Typography>
                <Typography sx={{ fontSize: "1.1rem", mt: 1 }}>
                  <strong>Phone:</strong> {analysisData?.analysis?.phone || "Not available"}
                </Typography>
                <Typography sx={{ fontSize: "1.1rem", mt: 1 }}>
                  <strong>Skills:</strong> {analysisData?.analysis?.skills.join(', ') || "No skills detected"}
                </Typography>

                <Divider sx={{ my: 2, bgcolor: "#ddd" }} />

                {/* Key Strengths */}
                <Typography 
                  variant="h6" 
                  color="success.main" 
                  fontWeight="bold" 
                  sx={{ mt: 2, textTransform: "uppercase" }}
                >
                  ✅ Key Strengths
                </Typography>
                <Typography sx={{ color: "green", fontSize: "1.1rem", mt: 1 }}>
                  {analysisData?.ai_analysis?.strengths || "AI analysis failed."}
                </Typography>

                <Divider sx={{ my: 2, bgcolor: "#ddd" }} />

                {/* Areas of Improvement */}
                <Typography 
                  variant="h6" 
                  color="error.main" 
                  fontWeight="bold" 
                  sx={{ mt: 3, textTransform: "uppercase" }}
                >
                  ⚠️ Areas of Improvement
                </Typography>
                <Typography sx={{ color: "red", fontSize: "1.1rem", mt: 1 }}>
                  {analysisData?.ai_analysis?.weaknesses || "Error: No weaknesses detected."}
                </Typography>

                <Divider sx={{ my: 3, bgcolor: "#ddd" }} />

                {/* 🔥 Job Matching Button */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    px: 3,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    borderRadius: 3,
                    boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: "#1E3A5F",
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={() => navigate("/job-matching")}
                >
                  🔍 Find Matching Jobs
                </Button>
              </CardContent>
            </Card>
          )}
        </Container>
      </Box>
      <Footer />

      {/* Smooth fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
};

export default AnalysisResult;
