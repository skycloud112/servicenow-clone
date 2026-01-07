'use client';

import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import { useDesignTokens } from '@repo/theme/DesignTokensProvider';
import { IncidentStatusBadge } from '../IncidentStatusBadge/IncidentStatusBadge';
import { PriorityBadge } from '../PriorityBadge/PriorityBadge';

type IncidentStatus = 'new' | 'in_progress' | 'on_hold' | 'resolved' | 'closed';
type IncidentPriority = 'critical' | 'high' | 'medium' | 'low';

type IncidentCardProps = {
  number: string;
  shortDescription: string;
  status: IncidentStatus;
  priority: IncidentPriority;
  createdAt: string;
};

export const IncidentCard = ({
  number,
  shortDescription,
  status,
  priority,
  createdAt,
}: IncidentCardProps): React.ReactElement => {
  const tokens = useDesignTokens();

  return (
    <Card sx={{ mb: 2, border: `1px solid ${tokens.colors.border}` }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {number}
            </Typography>
            <Typography variant="body1" fontWeight={500} sx={{ mt: 0.5 }}>
              {shortDescription}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <PriorityBadge priority={priority} />
            <IncidentStatusBadge status={status} />
          </Stack>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Created: {createdAt}
        </Typography>
      </CardContent>
    </Card>
  );
};
