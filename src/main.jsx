import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";
setAssetPath(window.location.href);
import { BrowserRouter } from "react-router-dom";

const baseUrl = '/permit-calculators/';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
