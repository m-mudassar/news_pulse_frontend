import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#ce8f32",
            light: "#f8f1e2",
            dark: '#af5921',
            contrastText: '#ffffff',
        },
        secondary: {
            main: "#d17f2f",
            light: "#f9efe2",
            dark: "#b3441d",
            contrastText: '#ffffff',
        },
        background: {
            default: "#F7F8FA",
        },
        divider: "#EDEFF2",
        text: {
            primary: "#718096",
        },
    },
    typography: {
        fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            xxl: 1920,
            xxxl: 2560,
        },
    },
});