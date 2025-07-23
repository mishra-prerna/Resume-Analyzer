import PropTypes from 'prop-types';
import { Button as MUIButton } from '@mui/material';

const Button = ({ children, onClick }) => {
  return (
    <MUIButton 
      onClick={onClick} 
      variant="contained" 
      color="primary" 
      sx={{ margin: 1 }}
    >
      {children}
    </MUIButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
