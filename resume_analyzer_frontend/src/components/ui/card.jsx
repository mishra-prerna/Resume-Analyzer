import PropTypes from 'prop-types';
import { Box, Paper } from "@mui/material";

export const Card = ({ children }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        padding: 3, 
        borderRadius: 2, 
        margin: 2, 
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" 
      }}
    >
      {children}
    </Paper>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export const CardContent = ({ children }) => {
  return (
    <Box 
      sx={{ 
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </Box>
  );
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
};
