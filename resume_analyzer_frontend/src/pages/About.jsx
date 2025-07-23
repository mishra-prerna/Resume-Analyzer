import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button
} from "@mui/material";
import {
  Sparkles,
  CheckCircle,
  Rocket,
  FileText,
  ClipboardCheck,
  Moon,
  Sun,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        bgcolor: darkMode ? "#121212" : "white",
        color: darkMode ? "white" : "black",
        transition: "background 0.3s ease",
      }}
    >
      {/* Sticky Header */}
      <Box sx={{ position: "sticky", top: 0, zIndex: 1000, width: "100%" }}>
        <Header />
      </Box>

       
      {/* Toggle Theme Button */}
     <Container sx={{ position: "relative", mt: 2 }}>
     <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", position: "absolute", top: 20, right: 20 }}>
      <IconButton
      onClick={() => setDarkMode(!darkMode)}
      color="primary"
      sx={{
        backgroundColor: darkMode ? "#333" : "#f5f5f5",
        "&:hover": { backgroundColor: darkMode ? "#555" : "#ddd" },
        transition: "0.3s",
      }}
    >
      {darkMode ? <Moon size={24} /> : <Sun size={24} />}
    </IconButton>
  </Box>
</Container>

      {/* Hero Section */}
      <Box
         sx={{
          backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          py: 12,
          textAlign: "center",
          position: "relative",
        }}
      >
        <Container>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            About <span style={{ color: "#FFD700" }}>ResuMate.ai</span>
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, maxWidth: 700, mx: "auto", opacity: 0.9, fontSize: "1.2rem" }}>
            Revolutionizing resume building with AI-powered insights, job-fit analysis, and instant feedback.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 3, fontWeight: "bold" }} onClick={() => navigate("/")}>
            Get Started
          </Button>
        </Container>
      </Box>

     {/* Vision & Mission Section */}
     <Container sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Vision */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
              <Rocket size={30} style={{ marginRight: 8 }} />
              Our Vision
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
              To empower job seekers with AI-driven resume analysis, ensuring their resumes stand out in a competitive job market.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
              alt="Vision"
              style={{ width: "100%", borderRadius: 10 }}
            />
          </Grid>

          {/* Mission */}
          <Grid item xs={12} md={6}>
            <img
              src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&q=80"
              alt="Mission"
              style={{ width: "100%", borderRadius: 10 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
              <CheckCircle size={30} style={{ marginRight: 8 }} />
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
              To simplify the resume-building process with intelligent feedback, job-fit analysis, and tailored recommendations.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Key Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary" gutterBottom>
          Key Features of ResuMate.ai
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
  {[
    {
      title: "AI-Powered Insights",
      description: "Analyze your resume with AI to improve structure, keywords, and readability.",
      icon: <Sparkles size={40} className="text-blue-700" />,
    },
    {
      title: "Job Match Scoring",
      description: "Find out how well your resume fits specific job descriptions.",
      icon: <ClipboardCheck size={40} className="text-green-500" />,
    },
    {
      title: "Instant Feedback",
      description: "Receive real-time suggestions for optimizing language and formatting.",
      icon: <CheckCircle size={40} className="text-blue-400" />,
    },
    {
      title: "Multi-Format Support",
      description: "Supports both PDF and DOCX resume uploads.",
      icon: <FileText size={40} className="text-yellow-500" />,
    },
  ].map((feature, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%", // Ensures equal height
          p: 4,
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "#F5F5F5",
          transition: "0.3s",
          "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>{feature.icon}</Box>
        <Typography variant="h6" fontWeight="bold" color="primary">
          {feature.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1, flexGrow: 1 }}>
          {feature.description}
        </Typography>
      </Paper>
    </Grid>
  ))}
</Grid>

      </Container>

      {/* Why Choose Us Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary" gutterBottom>
          Why Choose ResuMate.ai?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {[
            { title: "User-Friendly", desc: "Intuitive UI for seamless navigation." },
            { title: "AI-Powered Accuracy", desc: "Uses Gemini AI for precise resume analysis." },
            { title: "Time-Saving", desc: "Instant feedback in seconds." },
            { title: "100% Free", desc: "No hidden charges!" },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  backgroundColor: "#E3F2FD",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default About;
