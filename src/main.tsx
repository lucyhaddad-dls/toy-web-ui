import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx"


createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  // for sample builder -> look into using a table
  // react: debouncing .