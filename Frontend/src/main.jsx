import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppProviders from "./components/Providers/AppProviders";
import App from "./components/App";
import { Toaster } from "sonner";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import "./App.css";

const queryClient = new QueryClient();
injectSpeedInsights();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SpeedInsights debug />
      <Analytics />
      <AppProviders>
        <Toaster position="top-right" duration={1500} visibleToasts={1} />
        <App />
      </AppProviders>
    </QueryClientProvider>
  </StrictMode>
);
