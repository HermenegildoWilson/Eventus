import { useMemo, useState } from 'react';
import { Box, Container, Divider } from '@mui/material';

import './App.css';
import EntityManager from './components/EntityManager';
import EntityTabs from './components/EntityTabs';
import HeroSection from './components/HeroSection';
import PageFooter from './components/PageFooter';
import PageHeader from './components/PageHeader';
import { entities } from './data/entities';

function App() {
  const [active, setActive] = useState(0);
  const activeEntity = useMemo(() => entities[active], [active]);

  return (
    <Box className="app-root">
      <PageHeader />
      <HeroSection />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <EntityTabs entities={entities} active={active} onChange={setActive} />
        <Divider sx={{ my: 4 }} />
        <EntityManager config={activeEntity} />
      </Container>

      <PageFooter />
    </Box>
  );
}

export default App;
