import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Paper, InputAdornment } from "@mui/material";
import { AccountCircle, Email, Chat } from "@mui/icons-material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  const [result, setResult] = useState("");
  const [bgImage, setBgImage] = useState(""); // State for background image
  // const accessKey = import.meta.env.VITE_WEB3FORMS_API_KEY; // Web3Forms API Key
  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  // Fetch Unsplash Image on Load
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=office&client_id=${UNSPLASH_ACCESS_KEY}`);
        const data = await response.json();
        setBgImage(data.urls.regular); // Set image URL
      } catch (error) {
        console.error("Error fetching Unsplash image:", error);
      }
    };

    fetchImage();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", "e8eb9ae5-b3c2-48cf-b575-c6b9c21c35e2");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      }).then((res) => res.json());

      if (res.success) {
        setResult("Form Submitted Successfully!");
        event.target.reset();
      } else {
        setResult(`Error: ${res.message}`);
      }
    } catch (error) {
      setResult("Something went wrong, please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box display="flex" height="calc(100vh - 120px)" width="100vw">
        {/* Left Side - Dynamic Image */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "block" },
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 0.5s ease-in-out",
          }}
        />

        {/* Right Side - Contact Form */}
        <Box flex={1} display="flex" alignItems="center" justifyContent="center" bgcolor="#f7f9fc" p={3}>
          <Paper elevation={3} sx={{ p: 4, maxWidth: 450, width: "100%", borderRadius: 2 }}>
            <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
              Get in Touch
            </Typography>

            <Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={onSubmit}>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                name="name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                required
              />
              <TextField
                label="Your Email"
                type="email"
                variant="outlined"
                fullWidth
                name="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                required
              />
              <TextField
                label="Your Message"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                name="message"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" style={{ alignSelf: "flex-start" }}>
                      <Chat />
                    </InputAdornment>
                  ),
                }}
                required
              />

              <Button variant="contained" color="primary" size="large" fullWidth type="submit">
                Send Message
              </Button>

              {/* Display the result of the form submission */}
              {result && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: "center" }}>
                  {result}
                </Typography>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Contact;
