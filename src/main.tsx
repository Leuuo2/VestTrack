import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "../src/router";
import { initCloudSync } from "./lib/sync";
import "./index.css";

// Liga a sincronização com a nuvem (no-op se o .env não estiver configurado).
initCloudSync();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
