'use client';

import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { DesignTokensProvider, getTenantTokens, createMuiTheme } from '@repo/theme';
import { QueryProvider } from '@admin/providers/QueryProvider';

const tenantName = process.env.NEXT_PUBLIC_TENANT || 'tenant1';
const tokens = getTenantTokens(tenantName);
const muiTheme = createMuiTheme(tokens);

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps): React.ReactElement => {
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
