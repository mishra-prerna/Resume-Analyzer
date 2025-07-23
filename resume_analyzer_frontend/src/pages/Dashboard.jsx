import { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  UploadFile,
  Work,
  BarChart as BarChartIcon,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Header from "../components/Header";
import Footer from "../components/Footer";

const initialDashboardData = [
  { name: "Jan", resumes: 10, matches: 5 },
  { name: "Feb", resumes: 15, matches: 8 },
  { name: "Mar", resumes: 20, matches: 12 },
  { name: "Apr", resumes: 25, matches: 18 },
];

const statsConfig = [
  {
    icon: <UploadFile fontSize="large" />,
    value: "250",
    label: "Resumes Uploaded",
    colorLight: "#1565c0",
    colorDark: "#90caf9",
  },
  {
    icon: <Work fontSize="large" />,
    value: "120",
    label: "Job Matches",
    colorLight: "#2e7d32",
    colorDark: "#a5d6a7",
  },
  {
    icon: <BarChartIcon fontSize="large" />,
    value: "85%",
    label: "Resume Optimization",
    colorLight: "#ef6c00",
    colorDark: "#ffcc80",
  },
];

const WEBSOCKET_URL = "wss://your-websocket-server.example/ws"; // Replace with your WS URL

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [dashboardData, setDashboardData] = useState(initialDashboardData);

  const ws = useRef(null);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Setup WebSocket connection
    ws.current = new WebSocket(WEBSOCKET_URL);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      // Optionally request initial data or authenticate
      // ws.current.send(JSON.stringify({ type: "getInitialData" }));
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "updateData" && Array.isArray(message.data)) {
          setDashboardData(message.data);
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
      // Optionally implement reconnect logic here
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Theme colors
  const bgSecondary = darkMode ? "#1e1e1e" : "#fff";
  const chartBg = darkMode ? "#2c2c2c" : "#f9f9f9";
  const textSecondary = darkMode ? "#ccc" : "#555";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: darkMode ? "#121212" : "#f4f6f9",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <Header />

      <Box sx={{ flex: 1, p: 4 }}>
        {/* Header Row */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Dashboard
          </Typography>

          <IconButton
            onClick={toggleDarkMode}
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": {
                backgroundColor: darkMode ? "#1565c0" : "#0d47a1",
              },
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={4} mb={6}>
          {statsConfig.map(({ icon, value, label, colorLight, colorDark }, i) => (
            <Grid key={i} item xs={12} sm={6} md={4}>
              <Paper
                elevation={darkMode ? 2 : 6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  padding: 3,
                  borderRadius: 3,
                  background: darkMode
                    ? `linear-gradient(145deg, ${colorDark}33, ${colorDark}11)`
                    : `linear-gradient(145deg, ${colorLight}11, ${colorLight}22)`,
                  boxShadow: darkMode
                    ? "inset 2px 2px 5px #00000080, inset -2px -2px 5px #33333390"
                    : `0 8px 15px rgba(25, 118, 210, 0.2)`,
                  transition: "transform 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
                }}
              >
                <Box
                  sx={{
                    color: darkMode ? colorDark : colorLight,
                    fontSize: 48,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {icon}
                </Box>

                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    {value}
                  </Typography>
                  <Typography variant="body1" sx={{ color: textSecondary }}>
                    {label}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Grid container spacing={5}>
          {/* Bar Chart */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: 4,
                borderRadius: 4,
                backgroundColor: bgSecondary,
                height: 360,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: "#1976d2" }}>
                Resumes Uploaded Over Time
              </Typography>
              <Box sx={{ flexGrow: 1, backgroundColor: chartBg, borderRadius: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData}>
                    <XAxis dataKey="name" stroke={textSecondary} />
                    <YAxis stroke={textSecondary} allowDecimals={false} />
                    <RechartTooltip
                      contentStyle={{
                        backgroundColor: bgSecondary,
                        borderRadius: 8,
                        boxShadow: darkMode
                          ? "0 0 12px rgba(0,0,0,0.8)"
                          : "0 0 12px rgba(25, 118, 210, 0.15)",
                      }}
                    />
                    <Bar dataKey="resumes" fill="#1976d2" barSize={30} radius={[6, 6, 0, 0]} />
                    <Bar dataKey="matches" fill="#ef6c00" barSize={30} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Line Chart */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: 4,
                borderRadius: 4,
                backgroundColor: bgSecondary,
                height: 360,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: "#1976d2" }}>
                Resume Matches Over Time
              </Typography>
              <Box sx={{ flexGrow: 1, backgroundColor: chartBg, borderRadius: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData}>
                    <XAxis dataKey="name" stroke={textSecondary} />
                    <YAxis stroke={textSecondary} allowDecimals={false} />
                    <RechartTooltip
                      contentStyle={{
                        backgroundColor: bgSecondary,
                        borderRadius: 8,
                        boxShadow: darkMode
                          ? "0 0 12px rgba(0,0,0,0.8)"
                          : "0 0 12px rgba(25, 118, 210, 0.15)",
                      }}
                    />
                    <Line type="monotone" dataKey="matches" stroke="#ef6c00" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default Dashboard;
