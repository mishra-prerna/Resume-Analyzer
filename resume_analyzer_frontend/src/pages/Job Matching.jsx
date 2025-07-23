import { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Button, Grid, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "../components/Header";
import Footer from "../components/Footer";

const jobMatches = [
  { title: "Software Engineer", company: "Google", location: "California, USA" },
  { title: "Data Scientist", company: "Microsoft", location: "Washington, USA" },
  { title: "Web Developer", company: "Meta", location: "New York, USA" },
  { title: "AI Engineer", company: "OpenAI", location: "San Francisco, USA" },
  { title: "Product Manager", company: "Amazon", location: "Seattle, USA" },
];

const JobMatching = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#64b5f6" : "#1976d2" }, // Blue Theme
      secondary: { main: "#f50057" },
      background: { default: darkMode ? "#121212" : "#e3f2fd", paper: darkMode ? "#1e1e1e" : "#ffffff" },
      text: { primary: darkMode ? "#ffffff" : "#0d47a1" }, // Dark Blue Text for Light Mode
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });

  return (
    <>
      <Header /> {/* Ensure Header remains unchanged */}

      <ThemeProvider theme={theme}>
        {/* Main Content Section */}
        <Box
          sx={{
            width: "98vw",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            transition: "all 0.3s ease-in-out",
            px: 2,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "1200px", textAlign: "center", mb: 4 }}>
            {/* Page Title */}
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
              🔍 Find Your Perfect Job Match
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={2}>
              Based on your skills and experience, here are some great job opportunities for you.
            </Typography>

            {/* Dark Mode Toggle */}
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              color="primary"
              sx={{
                backgroundColor: theme.palette.background.paper,
                padding: "8px",
                borderRadius: "50%",
                transition: "all 0.3s ease",
                "&:hover": { backgroundColor: darkMode ? "#424242" : "#bbdefb" },
              }}
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {/* Job Cards Grid */}
            <Grid container spacing={3} justifyContent="center" mt={3}>
              {jobMatches.map((job, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: darkMode ? "0px 4px 12px rgba(255,255,255,0.1)" : "0px 4px 12px rgba(0,0,0,0.1)",
                      backgroundColor: theme.palette.background.paper,
                      transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: darkMode ? "0px 6px 16px rgba(255,255,255,0.2)" : "0px 6px 16px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", p: 3 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {job.title}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {job.company}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" mb={2}>
                        📍 {job.location}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                          mt: 2,
                          fontWeight: "bold",
                          textTransform: "none",
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#c51162",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>

      <Footer />
    </>
  );
};

export default JobMatching;