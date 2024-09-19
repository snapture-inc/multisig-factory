'use client';

import type { Shadows } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import type { TypographyOptions } from '@mui/material/styles/createTypography';

const safeFontFamily = 'DM Sans, sans-serif';

const typography: TypographyOptions = {
  fontFamily: safeFontFamily,
  h1: {
    fontSize: '32px',
    lineHeight: '36px',
    fontWeight: 700,
  },
  h4: {
    fontSize: '20px',
    lineHeight: '26px',
  },
};

const darkPalette = {
  text: {
    primary: '#000000',
    secondary: '#636669',
    disabled: '#636669',
  },
  primary: {
    dark: '#0cb259',
    main: '#12FF80',
    light: '#A1A3A7',
  },
};

const isDarkMode = true;
const colors = darkPalette;
const shadowColor = colors.primary.light;

const theme = createTheme({
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
    ...colors,
  },
  shape: {
    borderRadius: 6,
  },
  shadows: [
    'none',
    isDarkMode ? `0 0 2px ${shadowColor}` : `0 1px 4px ${shadowColor}0a, 0 4px 10px ${shadowColor}14`,
    isDarkMode ? `0 0 2px ${shadowColor}` : `0 1px 4px ${shadowColor}0a, 0 4px 10px ${shadowColor}14`,
    isDarkMode ? `0 0 2px ${shadowColor}` : `0 2px 20px ${shadowColor}0a, 0 8px 32px ${shadowColor}14`,
    isDarkMode ? `0 0 2px ${shadowColor}` : `0 8px 32px ${shadowColor}0a, 0 24px 60px ${shadowColor}14`,
    ...Array(20).fill('none'),
  ] as Shadows,
  typography,
  components: {
    MuiButton: {
      styleOverrides: {
        sizeMedium: {
          fontSize: '16px',
          padding: '12px 24px',
        },
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          fontWeight: 'bold',
          lineHeight: 1.25,
          borderColor: theme.palette.primary.main,
          textTransform: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        }),
        outlined: {
          border: '2px solid',
          '&:hover': {
            border: '2px solid',
          },
        },
      },
    },
  },
});

export default theme;
