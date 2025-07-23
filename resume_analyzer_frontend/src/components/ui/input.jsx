import { TextField } from "@mui/material";

const Input = ({ label = "", type = "text", value, onChange, ...props }) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value || ""}
      onChange={onChange || (() => {})} // Avoids "undefined" errors
      variant="outlined"
      fullWidth
      InputProps={{
        style: { fontSize: "16px" }, // Optional: Adjust text size
      }}
      {...props}
    />
  );
};

export default Input;
