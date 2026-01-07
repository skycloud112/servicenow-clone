'use client';

import React, { createContext, useContext } from 'react';
import { DesignTokens } from './types';

const DesignTokensContext = createContext<DesignTokens | undefined>(undefined);

type DesignTokensProviderProps = {
  tokens: DesignTokens;
  children: React.ReactNode;
};

export const DesignTokensProvider = ({
  tokens,
  children,
}: DesignTokensProviderProps): React.ReactElement => {
  return <DesignTokensContext.Provider value={tokens}>{children}</DesignTokensContext.Provider>;
};

export const useDesignTokens = (): DesignTokens => {
  const context = useContext(DesignTokensContext);
  if (!context) {
    throw new Error('useDesignTokens must be used within DesignTokensProvider');
  }
  return context;
};
