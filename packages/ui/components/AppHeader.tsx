'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useDesignTokens } from '@repo/theme';

type AppHeaderProps = {
  appName: string;
};

export const AppHeader = ({ appName }: AppHeaderProps): React.ReactElement => {
  const tokens = useDesignTokens();

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: tokens.colors.primary,
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={700} sx={{ color: '#fff' }}>
          {appName}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body2" sx={{ color: '#fff', opacity: 0.8 }}>
          {tokens.name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
