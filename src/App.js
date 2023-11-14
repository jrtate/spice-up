import Home from "./pages/Home/Home";
import { ThemeProvider } from "@mui/material";
import globalTheme from "./globalTheme";
import ToastProvider from "./contexts/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={globalTheme}>
          <ToastProvider>
            <BrowserRouter>
              <Home />
            </BrowserRouter>
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
