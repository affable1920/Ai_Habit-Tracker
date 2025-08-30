import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { injectSpeedInsights } from "@vercel/speed-insights";

import { Toaster } from "sonner";
import Modal from "./components/Modal";
import router from "./components/routes.tsx";

injectSpeedInsights();
import "./stylesheets/config.css";
import "./stylesheets/utils.css";

import "./stylesheets/baseComponents.css";
import "./stylesheets/interactives.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Modal />
    <SpeedInsights debug />
    <Analytics />
    <RouterProvider router={router} />
    <Toaster
      duration={1500}
      visibleToasts={2}
      position="top-center"
      style={{ fontSize: "text-(--text-sm)", fontFamily: "serif" }}
    />
  </StrictMode>
);
