import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";
setAssetPath(window.location.href);
import { HashRouter } from "react-router-dom";

const baseUrl = '/permit-calculators-react/';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter basename={baseUrl}>
      <App />
    </HashRouter>
  </React.StrictMode>
);
