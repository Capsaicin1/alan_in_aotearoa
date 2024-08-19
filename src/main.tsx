import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "mapbox-gl/dist/mapbox-gl.css";

console.log(
  `\n%cJulius du Plooy`,
  "color:#0dd8d8; background:#0b1021; font-size:1.5rem; padding:0.15rem 0.25rem; margin: 1rem auto; font-family: Rockwell; border: 2px solid #0dd8d8; border-radius: 4px;font-weight: bold; text-shadow: 1px 1px 1px #00af87bf;"
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
