import { useMemo, useState } from 'react';
import { Box, Container, Divider } from '@mui/material';

import EntityTabs from './components/EntityTabs';
import EntityManager from './components/EntityManager';
import HeroSection from './components/HeroSection';
import Footer from './layout/Footer';
import Header from './layout/Header';

import './App.css';
import entities from './data/entities';

function App() {
  const [active, setActive] = useState(0);
  const activeEntity = useMemo(() => entities[active], [active]);

  return (
    <Box className="app-root">
      <Header />
      <HeroSection />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <EntityTabs entities={entities} active={active} onChange={setActive} />
        <Divider sx={{ my: 4 }} />
        <EntityManager config={activeEntity} />
      </Container>

      <Footer />
    </Box>
  );
}

export default App;
