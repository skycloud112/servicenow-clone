'use client';

import React from 'react';
import { Chip } from '@mui/material';
import { useDesignTokens } from '@repo/theme/DesignTokensProvider';

type IncidentPriority = 'critical' | 'high' | 'medium' | 'low';

type PriorityBadgeProps = {
  priority: IncidentPriority;
};

const priorityLabels: Record<IncidentPriority, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const PriorityBadge = ({ priority }: PriorityBadgeProps): React.ReactElement => {
  const tokens = useDesignTokens();

  const getColor = (): string => {
    switch (priority) {
      case 'critical':
        return tokens.colors.error;
      case 'high':
        return tokens.colors.warning;
      case 'medium':
        return tokens.colors.info;
      case 'low':
        return tokens.colors.success;
    }
  };

  return (
    <Chip
      label={priorityLabels[priority]}
      size="small"
      variant="outlined"
      sx={{ borderColor: getColor(), color: getColor() }}
    />
  );
};
