import { Box, Typography, Button, Container } from '@mui/material';

const HeroSection = () => (
  <Box sx={{ bgcolor: 'background.paper', py: 16, px:16 }}>
    <Container>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 'bold'
        }}
      >
        Transforme Processos<br/>Manuais em Digitais
      </Typography>
      <Typography
        variant="h5"
        color="text.secondary"
        paragraph
        sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
      >
        Nossa solução permite que PMEs substituam formulários físicos por fluxos de documentos eletrônicos inteligentes, centralizando dados e facilitando a análise de indicadores-chave.
      </Typography>
      <Button variant="contained" color="primary" size="large">
        Saiba Mais
      </Button>
    </Container>
  </Box>
);

export default HeroSection;