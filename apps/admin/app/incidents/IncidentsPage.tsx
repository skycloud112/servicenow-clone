'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { AppHeader, IncidentCard } from '@repo/ui';
import { useIncidents } from './useCases/GetIncidentsUseCase/useIncidents';

export const IncidentsPage = (): React.ReactElement => {
  const { incidents, isLoading } = useIncidents();

  return (
    <Box>
      <AppHeader appName="ServiceNow Admin" />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Incidents
        </Typography>
        {isLoading && <Typography>Loading...</Typography>}
        {!isLoading && incidents.length === 0 && (
          <Typography color="text.secondary">No incidents found.</Typography>
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
