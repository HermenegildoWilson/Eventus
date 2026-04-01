import { Box, Container, Paper, Stack, Typography } from '@mui/material';

export default function HeroSection() {
  return (
    <Box className="hero">
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h2" className="hero-title">
            Centro de comando dos seus eventos académicos
          </Typography>
          <Typography variant="body1" className="hero-subtitle">
            Organize eventos, sessões, oradores e inscrições num fluxo único, com atualização em tempo real via API.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Paper className="hero-card" elevation={0}>
              <Typography variant="overline">Coleções</Typography>
              <Typography variant="h4">5</Typography>
              <Typography variant="body2" color="text.secondary">
                Módulos ativos a sincronizar
              </Typography>
            </Paper>
            <Paper className="hero-card" elevation={0}>
              <Typography variant="overline">Status</Typography>
              <Typography variant="h4">Live</Typography>
              <Typography variant="body2" color="text.secondary">
                API conectada ao backend
              </Typography>
            </Paper>
            <Paper className="hero-card" elevation={0}>
              <Typography variant="overline">Foco</Typography>
              <Typography variant="h4">Qualidade</Typography>
              <Typography variant="body2" color="text.secondary">
                Dados consistentes e seguros
              </Typography>
            </Paper>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
