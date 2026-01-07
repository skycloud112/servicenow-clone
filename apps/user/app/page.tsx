'use client';

import React from 'react';
import { Box, Typography, Container, Button, Stack } from '@mui/material';
import { AppHeader } from '@repo/ui/AppHeader';

const HomePage = (): React.ReactElement => {
  return (
    <Box>
      <AppHeader appName="ServiceNow Portal" />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h3" gutterBottom textAlign="center">
          IT Service Portal
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
          Submit and track your IT support requests
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" size="large" href="/submit-ticket">
            Submit Ticket
          </Button>
          <Button variant="outlined" size="large" href="/my-tickets">
            My Tickets
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
