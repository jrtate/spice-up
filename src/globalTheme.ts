import { createTheme } from "@mui/material/styles";
import type {} from "@mui/lab/themeAugmentation";

const globalTheme = createTheme({
  components: {
    MuiTimeline: {
      styleOverrides: {
        root: {
          backgroundColor: "red",
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#02f8f0",
    },
    secondary: {
      main: "#f04902",
    },
  },
});

export default globalTheme;
