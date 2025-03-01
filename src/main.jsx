import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/index";
import App from "./components/App";
import "./index.css";
import AppProviders from "./components/Providers/AppProviders";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AppProviders>
        <App />
      </AppProviders>
    </QueryClientProvider>
  </StrictMode>
);
