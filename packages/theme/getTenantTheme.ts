import { tenant1Tokens } from './tenants/tenant1';
import { tenant2Tokens } from './tenants/tenant2';
import { createMuiTheme } from './createMuiTheme';
import { DesignTokens } from './types';

const tenants: Record<string, DesignTokens> = {
  tenant1: tenant1Tokens,
  tenant2: tenant2Tokens,
};

export const getTenantTheme = (tenantName: string) => {
  const tokens = tenants[tenantName] || tenant1Tokens;
  return createMuiTheme(tokens);
};

export const getTenantTokens = (tenantName: string): DesignTokens => {
  return tenants[tenantName] || tenant1Tokens;
};
