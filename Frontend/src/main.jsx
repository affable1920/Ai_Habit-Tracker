import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./components/routes";
import { Toaster } from "sonner";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

// CSS
import "./index.css";
import "./App.css";

injectSpeedInsights();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SpeedInsights debug />
    <Analytics />
    <RouterProvider router={router} />
    <Toaster position="top-right" duration={1000} visibleToasts={1} />
  </StrictMode>
);
