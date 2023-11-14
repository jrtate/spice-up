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
      main: "#2785b0",
    },
    secondary: {
      main: "#B05327",
    },
  },
});

export default globalTheme;
