import { TextField } from "@mui/material";

const Textarea = ({ label, value, onChange, ...props }) => {
  return (
    <TextField
      label={label}
      value={value || ""}
      onChange={onChange || (() => {})}
      variant="outlined"
      fullWidth
      multiline
      rows={4} // Adjust as needed
      {...props}
    />
  );
};

export default Textarea;
