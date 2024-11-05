import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import "./styles/index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import About from "./pages/About";
import NotFoundPage from "./pages/NotFoundPage";
import DarkSky from "./pages/DarkSky";
import NightTimeDataPage from "./pages/NightTimeDataPage";

console.log(
  `\n%cJulius du Plooy`,
  "color:#0dd8d8; background:#0b1021; font-size:1.5rem; padding:0.15rem 0.25rem; margin: 1rem auto; font-family: Rockwell; border: 2px solid #0dd8d8; border-radius: 4px;font-weight: bold; text-shadow: 1px 1px 1px #00af87bf;"
);

//Router that sets the urls for the pages
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/darkSky",
    element: <DarkSky />,
  },
  {
    path: "/nightTimeData",
    element: <NightTimeDataPage />,
  },
]);

//This is a React thing -> just where stuff gets rendered so it doesn't matter.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Instead of rendering the app component, I render a router that 
    rendered different components based on the url */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
