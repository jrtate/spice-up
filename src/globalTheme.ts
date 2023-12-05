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
      main: "#2895cb",
    },
    secondary: {
      main: "#D9652E",
    },
  },
});

export default globalTheme;
