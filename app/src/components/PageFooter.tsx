import { Box, Container, Typography } from '@mui/material';

export default function PageFooter() {
  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Typography variant="body2">Eventus © {new Date().getFullYear()} · Gestão de eventos académicos</Typography>
      </Container>
    </Box>
  );
}
