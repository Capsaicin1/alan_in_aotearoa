import { useState, useRef, useEffect, ReactNode } from "react";
import "./styles/App.css";
import { Nav, NavItem } from "./components/Nav";
import { Menu, MenuItem } from "./components/Menu.jsx";
import IconComponent from "./components/IconComponent";
import { DownArrow, CloseX } from "./assets/icons/icons.ts";

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

  //State
  const [defaultLng, setDefaultLng] = useState(172);
  const [defaultLat, setDefaultLat] = useState(-41);
  const [defaultZoom, setDefaultZoom] = useState(4);
  const [defaultPitch, setDefaultPitch] = useState(52);
  const [defaultBearing, setDefaultBearing] = useState(-9);

  //Constants
  const activeLayerIDs = ["NTLChangeAbs", "NTLBrighter"];
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
        url: "mapbox://julesishomie.32ae7f6m",
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
                "raster-color": "rgba(255,234,0,1)",
                "raster-opacity": 0.9, // Slightly transparent to give a glowing effect
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
    // map.current.scrollZoom.disable();
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

  /**
   * Resets the map view to the specified parameters or default values.
   * @param lng - Longitudinal pos on map.
   * @param lat - Latitudinal pos on map.
   * @param pitch - Camera's pitch.
   * @param zoom - Map zoom level.
   * @param bearing - Map bearing.
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

  /**
   * Toggles the layers visibility on and off when called.
   * @param layerID
   */
  const handleLayerToggle = (layerID: string) => {
    const visibility = map.current?.getLayoutProperty(layerID, "visibility");

    if (visibility === "visible") {
      map.current?.setLayoutProperty(layerID, "visibility", "none");
    } else {
      map.current?.setLayoutProperty(layerID, "visibility", "visible");
    }
  };

  // DropDown React Functional Component
  function DropDown() {
    type DropDownProps = {
      leftIcon?: ReactNode;
      rightIcon?: ReactNode;
      children: React.ReactNode;
    };
    const DropdownItem = ({ leftIcon, rightIcon, children }: DropDownProps) => {
      return (
        <a href="#" className="dropdown-item">
          <span className="icon-left">{leftIcon}</span>
          {children}
          <span className="icon-right">{rightIcon}</span>
        </a>
      );
    };

    return (
      <div className="dropdown">
        <DropdownItem leftIcon={<IconComponent icon={CloseX} />}>
          Goeie Môre
        </DropdownItem>
      </div>
    );
  }

  return (
    <>
      <Nav>
        <NavItem text="test" />
        <NavItem text="test" />
        <NavItem text="test" />
      </Nav>
      <div className="map">
        {/* <div className="sidebar">
          Longitude: {defaultLng} | Latitude: {defaultLat} | Zoom: {defaultZoom}{" "}
          | Pitch:{defaultPitch} | Bearing: {defaultBearing}
        </div> */}
        <Menu>
          <MenuItem icon={<IconComponent icon={DownArrow} />}>
            <DropDown />
          </MenuItem>
        </Menu>
        {/* <button className="reset-map-view">Reset</button> */}
        <div ref={mapContainer} className="map-container" />
      </div>
      {activeLayerIDs.map((l) => (
        <button key={l} onClick={() => handleLayerToggle(l)}>
          {l}
        </button>
      ))}
    </>
  );
}

export default App;
