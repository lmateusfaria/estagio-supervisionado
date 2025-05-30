import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box sx={{ py: 3, textAlign: 'center', bgcolor: '#f5f5f5' }}>
    <Typography variant="body2" color="text.secondary">
      © 2025 Estágio Supervisionado. Todos os direitos reservados.
    </Typography>
  </Box>
);

export default Footer;