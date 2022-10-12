import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./pages/App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "./store";
import { DialogSelector } from "./modules/Dialogs/DialogSelector";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  },
});
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Provider store={store}>
        <App />
        <DialogSelector />
      </Provider>
    </ThemeProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);
