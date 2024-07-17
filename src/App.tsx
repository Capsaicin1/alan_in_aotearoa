import { useState, useRef, useEffect } from "react";
import "./styles/App.css";
import { Nav, NavItem } from "./components/Nav";
import { Menu, MenuItem } from "./components/Menu.jsx";
import IconComponent from "./components/IconComponent";
import { DownArrow } from "./assets/icons/icons.ts";

import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

/**
 * Main component that renders all of the content on the page.
 * Custom components are made in a separate file and imported.
 */
function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [defaultLng, setDefaultLng] = useState(172);
  const [defaultLat, setDefaultLat] = useState(-41);
  const [defaultZoom, setDefaultZoom] = useState(4);
  const [defaultPitch, setDefaultPitch] = useState(52);
  const [defaultBearing, setDefaultBearing] = useState(-9);
  const style = "mapbox://styles/julesishomie/clwycze8h019801pp1qto1bwq";
  const colors = {
    gradient: [
      "rgba(0, 0, 0, 0)", // nothing
      "rgba(0, 255, 0, 0)", //Green but a = 0, so 0 opacity
      "rgba(127, 255, 127, 0)", //#7FFF7F Light green
      "rgba(255, 255, 255, 1)", //#FFFFFF White
      "rgba(255, 127, 127, 1)", //#FF7F7F Light Pink
      "rgba(255, 0, 0, 1)", //FF0000 Red
      "rgba(255, 0, 255, 1)", //FF00FF Pink
    ],
  };

  /**
   * Resets the map view to the specified parameters or default values.
   *
   * @param lng - Longitudinal pos on map.
   * @param lat - Latitudinal pos on map.
   * @param pitch - Camera's pitch.
   * @param zoom - Map zoom level.
   * @param bearing - Map bearing.
   *
   * '?' Allows param to be optional.
   * Function doesn't work called directly in JSX/TSX
   */
  const resetMapView = (
    lng?: number,
    lat?: number,
    pitch?: number,
    zoom?: number,
    bearing?: number
  ): void => {
    if (map.current) {
      map.current.flyTo({
        center: [lng ?? defaultLng, lat ?? defaultLat],
        pitch: pitch ?? defaultPitch,
        zoom: zoom ?? defaultZoom,
        bearing: bearing ?? defaultBearing,
      });
    }
  };
  useEffect(() => {
    //initialize map only once
    if (map.current) return;
    // Creates the map and customizes basic properties
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style,
      center: [defaultLng, defaultLat],
      zoom: defaultZoom,
      pitch: defaultPitch,
      bearing: defaultBearing,
      maxZoom: 9,
      minZoom: 0,
    });

    map.current.on("load", () => {
      if (map.current === null) return;
      map.current.addSource("NTLChangeAbs_tileset", {
        type: "raster",
        url: "mapbox://julesishomie.2wpkql9d",
        tileSize: 256,
      });

      map.current.addSource("NTLBrighter_tileset", {
        type: "raster",
        url: "mapbox://julesishomie.3lxwjdfg",
        tileSize: 256,
      });

      //Checks that the raster is loaded, and that is not already loaded, before adding it to the map.
      map.current.on("data", (e) => {
        if (e.isSourceLoaded) {
          if (!map.current?.getLayer("NTLChangeAbs")) {
            map.current?.addLayer({
              id: "NTLChangeAbs",
              source: "NTLChangeAbs_tileset",
              type: "raster",
              layout: {
                visibility: "none",
              },
              paint: {
                "raster-color": [
                  "interpolate",
                  ["linear"],
                  ["raster-value"],
                  0,
                  colors.gradient[0],
                  23,
                  colors.gradient[1],
                  46,
                  colors.gradient[2],
                  69,
                  colors.gradient[3],
                  92,
                  colors.gradient[4],
                  115,
                  colors.gradient[5],
                  138,
                  colors.gradient[6],
                ],
                "raster-color-mix": [255, 0, 0, 1],
                "raster-color-range": [0, 138],
              },
            });
            console.log("raster is loaded");
          }

          if (!map.current?.getLayer("NTLBrighter")) {
            map.current?.addLayer({
              id: "NTLBrighter",
              source: "NTLBrighter_tileset",
              type: "raster",
              layout: {
                visibility: "visible",
              },
              paint: {
                "raster-color": [
                  "case",
                  ["==", ["raster-value"], 1],
                  ["to-color", "#FFFF00"],
                  ["to-color", "#FFFFFF"],
                ],
              },
            });
          }
        }
      });
    });

    // Gets and displays the following values as the user moves the map by updating the state of each variable
    map.current.on("move", () => {
      if (map.current !== null) {
        setDefaultLng(parseInt(map.current.getCenter().lng.toFixed(4)));
        setDefaultLat(parseInt(map.current.getCenter().lat.toFixed(4)));
        setDefaultZoom(parseInt(map.current.getZoom().toFixed(2)));
        setDefaultPitch(parseInt(map.current.getPitch().toFixed(2)));
        setDefaultBearing(parseInt(map.current.getBearing().toFixed(3)));
      }
    });

    /**
     * Disables zoom with mouse/track pad and adds zoom buttons.
     * If the map takes up the whole page, you wont be able to scroll down without doing this.
     */
    map.current.scrollZoom.disable();
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.current.addControl(new mapboxgl.ScaleControl(), "bottom-left");
    document
      .querySelector(".reset-map-view")
      ?.addEventListener("click", () => resetMapView());

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <>
      <Nav>
        <a href="#" className="logo">
          Aotearoa
        </a>
        <div className="links">
          <NavItem text="test" />
          <NavItem text="test" />
          <NavItem text="test" />
        </div>
      </Nav>
      <div className="map">
        {/* <div className="sidebar">
          Longitude: {defaultLng} | Latitude: {defaultLat} | Zoom: {defaultZoom}{" "}
          | Pitch:{defaultPitch} | Bearing: {defaultBearing}
        </div> */}
        <Menu>
          <MenuItem icon={<IconComponent icon={DownArrow} />}>
            <p>Hello World</p>
          </MenuItem>
        </Menu>
        <button className="reset-map-view">Reset</button>
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  );
}

export default App;
