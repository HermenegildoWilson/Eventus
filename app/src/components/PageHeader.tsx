import { AppBar, Box, Chip, Stack, Toolbar } from '@mui/material';
import { API_BASE_URL } from '../config';

export default function PageHeader() {
  return (
    <AppBar position="sticky" elevation={0} color="transparent" className="app-bar">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box className="logo">Eventus</Box>
          <Chip label="Academic Events" color="secondary" size="small" />
        </Stack>
        <Chip label={`API: ${API_BASE_URL}`} size="small" variant="outlined" />
      </Toolbar>
    </AppBar>
  );
}
