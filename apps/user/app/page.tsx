'use client';

import React from 'react';
import { Box, Typography, Container, Button, Stack } from '@mui/material';
import { AppHeader } from '@repo/ui/AppHeader';
import Link from 'next/link';

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
          <Button variant="contained" component={Link} href="/submit-ticket" size="large">
            Submit Ticket
          </Button>
          <Button variant="outlined" component={Link} href="/my-tickets" size="large">
            My Tickets
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
