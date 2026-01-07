'use client';

import React from 'react';
import { Chip } from '@mui/material';
import { useDesignTokens } from '@repo/theme/DesignTokensProvider';

type IncidentStatus = 'new' | 'in_progress' | 'on_hold' | 'resolved' | 'closed';

type IncidentStatusBadgeProps = {
  status: IncidentStatus;
};

const statusLabels: Record<IncidentStatus, string> = {
  new: 'New',
  in_progress: 'In Progress',
  on_hold: 'On Hold',
  resolved: 'Resolved',
  closed: 'Closed',
};

export const IncidentStatusBadge = ({ status }: IncidentStatusBadgeProps): React.ReactElement => {
  const tokens = useDesignTokens();

  const getColor = (): string => {
    switch (status) {
      case 'new':
        return tokens.colors.info;
      case 'in_progress':
        return tokens.colors.warning;
      case 'on_hold':
        return tokens.colors.textMuted;
      case 'resolved':
        return tokens.colors.success;
      case 'closed':
        return tokens.colors.textMuted;
    }
  };

  return <Chip label={statusLabels[status]} size="small" sx={{ bgcolor: getColor(), color: '#fff' }} />;
};
