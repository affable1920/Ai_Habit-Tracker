import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppProviders from "./components/Providers/AppProviders";
import App from "./components/App";
import { Toaster } from "sonner";
import { injectSpeedInsights } from "@vercel/speed-insights";
import "./index.css";
import "./App.css";

const queryClient = new QueryClient();
injectSpeedInsights();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <Toaster position="top-right" />
        <App />
      </AppProviders>
    </QueryClientProvider>
  </StrictMode>
);
