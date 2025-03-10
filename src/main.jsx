import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/index";
import App from "./components/App";
import AppProviders from "./components/Providers/AppProviders";
import { Toaster } from "sonner";
import "./index.css";
import "./App.css";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AppProviders>
        <Toaster position="top-right" richColors />
        <App />
      </AppProviders>
    </QueryClientProvider>
  </StrictMode>
);
