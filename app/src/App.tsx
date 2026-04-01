import { useMemo, useState } from 'react';
import {
  AppBar,
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';

import './App.css';
import { API_BASE_URL } from './config';
import EntityManager from './components/EntityManager';
import { entities } from './data/entities';

function App() {
  const [active, setActive] = useState(0);
  const activeEntity = useMemo(() => entities[active], [active]);

  return (
    <Box className="app-root">
      <AppBar position="sticky" elevation={0} color="transparent" className="app-bar">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box className="logo">Eventus</Box>
            <Chip label="Academic Events" color="secondary" size="small" />
          </Stack>
          <Chip label={`API: ${API_BASE_URL}`} size="small" variant="outlined" />
        </Toolbar>
      </AppBar>

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

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper elevation={0} className="tabs-shell">
          <Tabs
            value={active}
            onChange={(_, value) => setActive(value)}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            {entities.map((entity) => (
              <Tab key={entity.key} label={entity.title} />
            ))}
          </Tabs>
        </Paper>

        <Divider sx={{ my: 4 }} />

        <EntityManager config={activeEntity} />
      </Container>

      <Box component="footer" className="footer">
        <Container maxWidth="lg">
          <Typography variant="body2">
            Eventus © {new Date().getFullYear()} · Gestão de eventos académicos
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
