import { createTheme } from "@mui/material";

export const backgroundColor = "#f7f6f3";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#f0f1ed", //light
            light: "#9c73d2", //main
            dark: "#84bf35",
        },
        secondary: {
            main: "#4f21a5",
            light: "#daecc3",
            dark: "#9c73d2"
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 1163,
            md: 1163,
            lg: 1200,
            xl: 1536,
        }
    },
    typography: {
        allVariants: {

        },
        h1: {
            fontFamily: 'Fasthand',
            fontSize: "3rem",
            color: "#4f21a5"
        },
        h5:
        {
            fontFamily: 'Roboto Slab',
        },
        body2: {
            fontFamily: 'Roboto',
        }
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
                    marginTop: "5rem"
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    height: "auto",
                    borderRadius: "0.5rem"
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    display: "block"
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#9c73d2',
                    fontWeight: 'bold'
                }
            }
        }
}})