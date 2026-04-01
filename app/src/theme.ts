import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f766e',
      dark: '#0b4f4a',
      light: '#2aa198',
    },
    secondary: {
      main: '#f59e0b',
      dark: '#b45309',
      light: '#fbbf24',
    },
    background: {
      default: '#f7f3ed',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
    h1: { fontWeight: 700, letterSpacing: -1 },
    h2: { fontWeight: 700, letterSpacing: -0.6 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
