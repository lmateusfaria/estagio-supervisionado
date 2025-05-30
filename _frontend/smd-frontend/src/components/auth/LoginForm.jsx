import { Button, TextField, Box, Typography } from '@mui/material';

const LoginForm = () => (
  <Box sx={{ bgcolor: 'background.paper', py: 16, px:46 }}>
    <Typography variant="h5" gutterBottom>
      Login
    </Typography>
    <form>
      <TextField label="Email" fullWidth margin="normal" />
      <TextField label="Senha" type="password" fullWidth margin="normal" />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Entrar
      </Button>
    </form>
  </Box>
);

export default LoginForm;
