import { useState, useEffect } from "react";
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, TextField, Grid, IconButton, Typography, Tooltip
} from "@mui/material";
import {
  Visibility, Download, Delete, UploadFile, Brightness4, Brightness7
} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "../components/Header";
import Footer from "../components/Footer";

const mockResumes = [
  { id: 1, fileName: "John_Doe_Resume.pdf", uploadDate: "2025-02-15", jobMatchScore: "85%" },
  { id: 2, fileName: "Jane_Smith_CV.docx", uploadDate: "2025-02-10", jobMatchScore: "92%" },
  { id: 3, fileName: "Mark_Johnson_Resume.pdf", uploadDate: "2025-02-08", jobMatchScore: "78%" },
];

const SavedResumes = () => {
  const [search, setSearch] = useState("");
  const [resumes, setResumes] = useState(mockResumes);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#90caf9" : "#1565c0" },
      secondary: { main: "#f50057" },
      background: {
        default: darkMode ? "#121212" : "#f9fafb",
        paper: darkMode ? "#1e1e1e" : "#ffffff"
      },
      text: {
        primary: darkMode ? "#e3f2fd" : "#0d47a1",
        secondary: darkMode ? "#a0a0a0" : "#555555",
      }
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h4: { fontWeight: 700 },
      body1: { fontWeight: 500 },
    },
    components: {
      MuiTableRow: {
        styleOverrides: {
          root: {
            transition: "background-color 0.25s ease",
            "&:hover": {
              backgroundColor: darkMode ? "rgba(144,202,249,0.1)" : "rgba(21,101,192,0.1)",
              cursor: "pointer",
            }
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.1)"
            }
          }
        }
      }
    }
  });

  const filteredResumes = resumes.filter(resume =>
    resume.fileName.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setResumes(resumes.filter(resume => resume.id !== id));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100vw" }}>
      <Header />

      <ThemeProvider theme={theme}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: { xs: 2, md: 4 },
            backgroundColor: theme.palette.background.default,
            minHeight: "calc(100vh - 140px)" // header + footer approx height
          }}
        >
          {/* Title and Dark Mode Toggle */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 4,
            }}
          >
            <Typography variant="h4" color="primary">
              📂 Your Saved Resumes
            </Typography>
            <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <IconButton
                onClick={() => setDarkMode(!darkMode)}
                color="primary"
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  p: 1.25,
                  borderRadius: "50%",
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: darkMode ? "#394a5a" : "#bbdefb"
                  },
                  transition: "background-color 0.3s ease"
                }}
                aria-label="toggle dark mode"
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Search Bar */}
          <TextField
            label="Search Resumes..."
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              maxWidth: 900,
              mb: 4,
              boxShadow: 1,
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: theme.palette.background.paper,
              }
            }}
          />

          {/* Table */}
          <TableContainer
            component={Paper}
            elevation={6}
            sx={{
              maxWidth: 900,
              width: "100%",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: darkMode ? "0 4px 20px rgba(255,255,255,0.05)" : "0 4px 20px rgba(0,0,0,0.1)"
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                  {["File Name", "Upload Date", "Job Match Score", "Actions"].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: "1rem",
                        borderBottom: "none",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredResumes.length > 0 ? (
                  filteredResumes.map(({ id, fileName, uploadDate, jobMatchScore }) => (
                    <TableRow key={id} tabIndex={0} role="button" aria-label={`Resume ${fileName}`}>
                      <TableCell sx={{ fontWeight: 600 }}>{fileName}</TableCell>
                      <TableCell>{uploadDate}</TableCell>
                      <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: 600 }}>
                        {jobMatchScore}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View">
                          <IconButton
                            color="primary"
                            aria-label={`View ${fileName}`}
                            size="large"
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download">
                          <IconButton
                            color="success"
                            aria-label={`Download ${fileName}`}
                            size="large"
                          >
                            <Download />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            aria-label={`Delete ${fileName}`}
                            size="large"
                            onClick={() => handleDelete(id)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 6, color: theme.palette.text.secondary }}>
                      No resumes found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Upload Button */}
          <Grid container justifyContent="center" sx={{ mt: 5 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<UploadFile />}
              sx={{
                px: 5,
                py: 1.8,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 3,
                boxShadow: 3,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  boxShadow: "0 6px 15px rgba(21,101,192,0.4)"
                }
              }}
            >
              Upload New Resume
            </Button>
          </Grid>
        </Box>
      </ThemeProvider>

      <Footer />
    </Box>
  );
};

export default SavedResumes;
