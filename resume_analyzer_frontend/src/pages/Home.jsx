import { Box, Container, Typography, Button, Grid, Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    { 
      title: 'AI-Powered Analysis', 
      description: 'Get deep insights into your resume with AI-driven recommendations.', 
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80' 
    },
    { 
      title: 'Instant Feedback', 
      description: 'Receive real-time suggestions to improve your resume instantly.', 
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80&auto=format'  
    },
    {
      title: 'Job Match Insights', 
      description: 'Check how well your resume aligns with job requirements.', 
      image: 'https://images.unsplash.com/photo-1560264418-c4445382edbc?w=800&q=80'  
    }
  ];

  const faqs = [
    { 
      question: "How does AI analyze my resume?", 
      answer: "Our AI scans your resume for structure, keywords, and job relevance, providing real-time feedback and improvement suggestions."
    },
    { 
      question: "Is my data secure?", 
      answer: "Yes! We do not store any resumes. Your data is analyzed in real time and not saved on our servers."
    },
    { 
      question: "What formats are supported?", 
      answer: "We support PDF and DOCX formats for seamless analysis and feedback."
    },
    { 
      question: "Can I use this for free?", 
      answer: "Yes, our basic analysis is free, with premium features available for deeper insights."
    }
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
      
      {/* Sticky Header */}
      <Box sx={{ position: "sticky", top: 0, zIndex: 1000, width: "100%" }}>
        <Header />
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "black",
          py: 12,
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            AI Resume Analyzer
          </Typography>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, maxWidth: 700, mx: "auto", opacity: 0.9 }}>
            Transform your resume with intelligent insights. Get personalized feedback and recommendations to stand out in your job search.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" color="primary" size="large" onClick={() => navigate("/upload")}>
              Upload Resume
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 10, width: "100%" }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary" gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper 
                elevation={6} 
                sx={{ 
                  p: 4, textAlign: "center", borderRadius: 3, 
                  transition: "0.3s", overflow: "hidden",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 8 }
                }}
              >
                <Box 
                  sx={{ 
                    height: 180, 
                    backgroundImage: `url(${feature.image})`, 
                    backgroundSize: "cover", 
                    backgroundPosition: "center", 
                    borderRadius: 2,
                    mb: 2
                  }} 
                />
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Statistics Section */}
      <Box sx={{ backgroundColor: "#E3F2FD", py: 10, width: "100%" }}>
        <Container>
          <Grid container spacing={4} justifyContent="center">
            {[
              { label: "Accuracy Rate", value: "98%", icon: "📊" },
              { label: "Availability", value: "24/7", icon: "⏳" },
              { label: "Resumes Analyzed", value: "10k+", icon: "📑" }
            ].map((stat, index) => (
              <Grid item xs={12} sm={4} key={index} textAlign="center">
                <Typography variant="h2" fontWeight="bold" color="primary">
                  {stat.icon} {stat.value}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={3} sx={{ mt: 4, justifyContent: "center" }}>
          {faqs.map((faq, index) => (
            <Grid item xs={12} sm={10} md={8} key={index}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: "bold" }}>
                  {faq.question}
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Sticky Footer */}
      <Box sx={{ position: "sticky", bottom: 0, zIndex: 1000, width: "100%" }}>
        <Footer />
      </Box>

    </Box>
  );
};

export default Home;
