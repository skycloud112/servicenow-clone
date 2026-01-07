'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { AppHeader, IncidentCard } from '@repo/ui';
import { useMyIncidents } from './useCases/GetMyIncidentsUseCase/useMyIncidents';

export const MyTicketsPage = (): React.ReactElement => {
  const { incidents, isLoading } = useMyIncidents('demo-user');

  return (
    <Box>
      <AppHeader appName="ServiceNow Portal" />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Tickets
        </Typography>
        {isLoading && <Typography>Loading...</Typography>}
        {!isLoading && incidents.length === 0 && (
          <Typography color="text.secondary">You have no tickets.</Typography>
        )}
        {incidents.map((incident) => (
          <IncidentCard
            key={incident.id}
            number={incident.number}
            shortDescription={incident.shortDescription}
            status={incident.status}
            priority={incident.priority}
            createdAt={new Date(incident.createdAt).toLocaleString()}
          />
        ))}
      </Container>
    </Box>
  );
};
