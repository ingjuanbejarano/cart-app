import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      [`@media (min-width:${600}px)`]: {
        fontSize: "2.5rem",
      },
      [`@media (min-width:${900}px)`]: {
        fontSize: "3rem",
      },
    },
  },
});

export default theme;
