'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { AppHeader } from '@repo/ui/AppHeader';
import { useSubmitIncident } from './useCases/SubmitIncidentUseCase/useSubmitIncident';
import type { IncidentPriority } from '@repo/entities/Incident';

export const SubmitTicketPage = (): React.ReactElement => {
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<IncidentPriority>('medium');
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const submitIncident = useSubmitIncident();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submitIncident.mutateAsync({
      shortDescription,
      description,
      priority,
      reporterId: 'demo-user',
    });
    setSuccess(`Ticket ${result.incidentNumber} submitted successfully!`);
    setShortDescription('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <Box>
      <AppHeader appName="ServiceNow Portal" />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Submit a Ticket
        </Typography>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(undefined)}>
            {success}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Short Description"
            fullWidth
            required
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            required
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value as IncidentPriority)}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={submitIncident.isPending}
          >
            {submitIncident.isPending ? 'Submitting...' : 'Submit Ticket'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
