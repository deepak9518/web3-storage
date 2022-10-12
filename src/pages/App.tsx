import { Provider } from "react-redux";
// import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import theme from "../theme";
import "../styles/globals.css";
import { DialogSelector } from "../modules/Dialogs/DialogSelector";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
// import { Provider as RollbarProvider, ErrorBoundary } from "@rollbar/react";
import Dashboard from "./dashboard";
import store from "src/store";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnMount: true,
//       refetchOnWindowFocus: true,
//     },
//   },
// });
// const persistor = persistStore(store);

// const rollbarConfig = {
//   accessToken: "26854efa67044821910294ed31a51048",
//   captureUncaught: true,
//   captureUnhandledRejections: true,
//   environment: "production",
// };

// This default export is required in a new `pages/_app.js` file.
const App = () => {
  const folderId = "";
  return (
    // <RollbarProvider config={rollbarConfig}>
    //   <ErrorBoundary>
    //     <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
        <Dashboard folderId={folderId} />
        <DialogSelector />
        {/* </PersistGate> */}
      </Provider>
    </ThemeProvider>
    // </QueryClientProvider>
    //   </ErrorBoundary>
    // </RollbarProvider>
  );
};

export default App;
