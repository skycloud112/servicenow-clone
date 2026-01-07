'use client';

import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { DesignTokensProvider } from '@repo/theme/DesignTokensProvider';
import { getTenantTokens } from '@repo/theme/getTenantTheme';
import { createMuiTheme } from '@repo/theme/createMuiTheme';
import { QueryProvider } from '@user/providers/QueryProvider';

const tenantName = process.env.NEXT_PUBLIC_TENANT || 'tenant1';
const tokens = getTenantTokens(tenantName);
const muiTheme = createMuiTheme(tokens);

const RootLayout = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <DesignTokensProvider tokens={tokens}>
            <ThemeProvider theme={muiTheme}>
              <CssBaseline />
              <QueryProvider>{children}</QueryProvider>
            </ThemeProvider>
          </DesignTokensProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
