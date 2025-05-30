import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Estágio Supervisionado
      </Typography>
      <Button color="inherit" component={Link} to="/">Início</Button>
      <Button color="inherit" component={Link} to="/login">Login</Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;