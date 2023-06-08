import { createTheme } from '@mui/material';

export const backgroundColor = '#f7f6f3';
export const lightGrey = '#dedede';
export const violet = '#9c73d2';
export const darkViolet = '#4f21a5';
export const lightViolet = '#f7f5fd';
export const header = '#f0f1ed';

export const theme = createTheme({
  palette: {
    primary: {
      main: darkViolet,
      light: violet,
    },
    secondary: {
      main: darkViolet,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 1163,
      md: 1163,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    allVariants: {},
    h1: {
      fontFamily: 'Fasthand',
      fontSize: '3rem',
      color: darkViolet,
    },
    h5: {
      fontFamily: 'Roboto Slab',
    },
    body2: {
      fontFamily: 'Roboto',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
              body {
                background-color: ${backgroundColor}
              }
            `,
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          marginTop: '5rem',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          height: 'auto',
          borderRadius: '0.5rem',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          display: 'block',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 0,
          paddingRight: '0.5rem',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: violet,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: violet,
          },
          fontWeight: 700,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: header,
          borderBottom: `1px solid ${lightGrey}`,
          padding: '0 1rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: violet,
            backgroundColor: lightViolet,
          },
          '&:hover': {
            backgroundColor: lightViolet,
          },
        },
      },
      defaultProps: {
        disableRipple : true
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          color: violet,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '& .MuiSlider-thumb': {
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
              boxShadow: 'inherit',
            },
          },
        },
      },
    },
  },
});
