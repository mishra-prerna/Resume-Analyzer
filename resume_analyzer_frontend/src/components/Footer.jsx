import { Container, Typography, Box, IconButton, Stack } from "@mui/material";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{ 
        backgroundColor: "#1976d2",  
        color: "#fff",  
        py: 4,   
        minHeight: "120px",   
        textAlign: "center",
        flexShrink: 0
      }}
    >
      <Container maxWidth="md">
        {/* Social Media Links */}
        <Stack direction="row" justifyContent="center" spacing={3} sx={{ mb: 1 }}>
          <IconButton href="https://linkedin.com" target="_blank" sx={{ color: "white" }}>
            <LinkedIn />
          </IconButton>
          <IconButton href="https://github.com" target="_blank" sx={{ color: "white" }}>
            <GitHub />
          </IconButton>
          <IconButton href="https://twitter.com" target="_blank" sx={{ color: "white" }}>
            <Twitter />
          </IconButton>
        </Stack>

        {/* Footer Text */}
        <Typography variant="h6" fontWeight="bold">
        ResuMate.ai
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, maxWidth: 600, mx: "auto" }}>
          Helping job seekers craft the perfect resume with AI-driven insights, personalized feedback, and job match analysis.
        </Typography>

        {/* Copyright */}
        <Typography variant="body2" sx={{ mt: 2, fontSize: "14px", opacity: 0.8 }}>
          © {new Date().getFullYear()} ResuMate.ai. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
