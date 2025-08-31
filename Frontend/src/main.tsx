import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { Toaster } from "sonner";
import router from "./components/routes.js";

import "./stylesheets/config.css";
import "./stylesheets/utils.css";

import "./stylesheets/baseComponents.css";
import "./stylesheets/interactives.css";

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <Analytics />
    <SpeedInsights debug />
    <RouterProvider router={router} />
    <Toaster
      duration={1500}
      visibleToasts={2}
      position="top-center"
      style={{ fontSize: "var(--text-sm)", fontFamily: "serif" }}
    />
  </StrictMode>
);
