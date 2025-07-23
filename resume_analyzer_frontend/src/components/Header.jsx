import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <AppBar position="sticky" color="default" elevation={4}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/")}>
          <img src={logo} alt="ResuMate.ai Logo" style={{ height: 60, marginRight: 10 }} />
          <Typography variant="h5" fontWeight="bold" color="primary">
            ResuMate.ai
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
          <Button color="inherit" onClick={() => navigate("/about")}>About Us</Button>
          <Button color="inherit" onClick={() => navigate("/savedResume")}>Saved Resumes</Button>
          <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate("/contact")}>Contact</Button>
        </Box>

        {isAuthenticated && (
          <Box>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
