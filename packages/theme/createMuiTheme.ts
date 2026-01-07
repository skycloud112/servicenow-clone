import { createTheme, Theme } from '@mui/material/styles';
import { DesignTokens } from './types';

export const createMuiTheme = (tokens: DesignTokens): Theme => {
  return createTheme({
    palette: {
      primary: { main: tokens.colors.primary },
      secondary: { main: tokens.colors.secondary },
      background: {
        default: tokens.colors.background,
        paper: tokens.colors.surface,
      },
      text: {
        primary: tokens.colors.text,
        secondary: tokens.colors.textMuted,
      },
      success: { main: tokens.colors.success },
      warning: { main: tokens.colors.warning },
      error: { main: tokens.colors.error },
      info: { main: tokens.colors.info },
      divider: tokens.colors.border,
    },
  });
};
