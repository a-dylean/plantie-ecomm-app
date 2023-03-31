import { createTheme } from "@mui/material";

const backgroundColor = "#f7f6f3";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#f0f1ed", //light
            light: "#9c73d2", //main
            dark: "#84bf35"
        },
        secondary: {
            main: "#4f21a5",
            light: "#daecc3",
            dark: "#a9d273"
        },
    },
    typography: {
        allVariants: {

        },
        h1: {
            fontFamily: 'Fasthand',
            fontSize: "3rem",
            color: "#4f21a5"
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
        }
}})