import { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "../styles/App.css";
import geoJSON from "../data/darkSkyLocations.ts";
import { layers } from "../data/mapLayers.tsx";

import { Nav, NavItem } from "../components/Nav/Nav.tsx";
import Acknowledgements from "../components/Acknowledgements.tsx";
import LoadingSpinner from "../components/loader/LoadingSpinner.tsx";

import IconComponent from "../components/IconComponent";
import { InfoCircleOutline, MapPin } from "../assets/icons/icons.ts";
import SidePanel from "../components/SidePanel/SidePanel.tsx";

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

  //State -> For components
  const [acknowledgeOpen, setAcknowledgeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  // const [refreshMarkers, setRefreshMarkers] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<string>(() => {
    return localStorage.getItem("selectedDarkSkyLayer") || "Toggle All";
  });

  //Constants
  // const activeLayerIDs = ["NTLChangeAbs", "NTLBrighter"];
  const style = "mapbox://styles/julesishomie/clwycze8h019801pp1qto1bwq";

  //Object containing colours for the map styling
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

  const darkSkyLayerCategories = [
    "Toggle All",
    "Dark Sky Reserves",
    "Dark Sky Sanctuaries",
    "Dark Sky Parks",
    "None",
  ];

  const markerMap: { [category: string]: mapboxgl.Marker[] } = {};

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
      maxZoom: 15,
      minZoom: 0,
    });

    map.current.on("load", () => {
      if (map.current === null) return;
      layers.overallChangeLayers.map(({ layer }) => {
        map.current?.addSource(layer.name, {
          type: "raster", // -> Always this
          url: layer.url,
          tileSize: 256, // -> Always this
        });
      });

      layers.viirsLayers.map(({ layer }) => {
        map.current?.addSource(layer.name, {
          type: "raster",
          url: layer.url,
          tileSize: 256,
        });
      });
      // map.current.addSource("test", {
      //   type: "raster",
      //   url: "mapbox://julesishomie.4uirg4op",
      //   tileSize: 256,
      // });

      //Checks that the raster is loaded, and that is not already loaded, before adding it to the map.
      map.current.on("data", (e) => {
        if (e.isSourceLoaded) {
          layers.overallChangeLayers.map(({ layer }) => {
            if (map.current?.getLayer(layer.id)) return;
            map.current?.addLayer({
              id: layer.id,
              source: layer.name,
              type: "raster",
              layout: {
                visibility: "none",
              },
            });
            console.log(`Just added ${layer.name}`);
          });

          layers.viirsLayers.map(({ layer }) => {
            if (map.current?.getLayer(layer.id)) return;
            map.current?.addLayer({
              id: layer.id,
              source: layer.name,
              type: "raster",
              layout: {
                visibility: "none",
              },
            });
            console.log(`Just added ${layer.name}`);
          });
          // if (!map.current?.getLayer("NTLChangeAbs")) {
          //   map.current?.addLayer({
          //     id: "NTLChangeAbs",
          //     source: "NTLChangeAbs_tileset",
          //     type: "raster",
          //     layout: {
          //       visibility: "none",
          //     },
          //     //
          //     paint: {
          //       "raster-color": [
          //         "interpolate",
          //         ["linear"],
          //         ["raster-value"],
          //         0,
          //         colors.gradient[0],
          //         23,
          //         colors.gradient[1],
          //         46,
          //         colors.gradient[2],
          //         69,
          //         colors.gradient[3],
          //         92,
          //         colors.gradient[4],
          //         115,
          //         colors.gradient[5],
          //         138,
          //         colors.gradient[6],
          //       ],
          //       "raster-color-mix": [255, 0, 0, 1],
          //       "raster-color-range": [0, 138],
          //     },
          //   });
          //   console.log("raster is loaded");
          // }
          // if (!map.current?.getLayer("test")) {
          //   map.current?.addLayer({
          //     id: "test",
          //     source: "test",
          //     type: "raster",
          //     layout: {
          //       visibility: "visible",
          //     },
          //     paint: {
          //       "raster-opacity": 0.8,
          //       "raster-color": [
          //         "interpolate",
          //         ["linear"],
          //         ["raster-value"],
          //         0,
          //         "rgba(0, 0, 0, 0)", // Transparent for value 0
          //         20,
          //         "hsl(240, 100%, 70%)", // Light Blue for very low values
          //         40,
          //         "hsl(180, 100%, 50%)", // Cyan for low values
          //         60,
          //         "hsl(120, 100%, 60%)", // Brighter Green for mid-low values
          //         80,
          //         "hsl(120, 100%, 30%)", // Darker Green for mid-range
          //         100,
          //         "hsl(60, 100%, 60%)", // Brighter Yellow for higher mid-range
          //         140,
          //         "hsl(60, 100%, 40%)", // Darker Yellow for higher mid-range
          //         180,
          //         "hsl(30, 100%, 50%)", // Orange for upper mid-range
          //         220,
          //         "hsl(0, 100%, 50%)", // Red for high values
          //         234,
          //         "hsl(0, 100%, 30%)", // Dark Red for max value (234)
          //       ],
          //       "raster-color-mix": [255, 0, 0, 1],
          //       "raster-color-range": [0, 234],
          //     },
          //   });
          // }
          //Adds layer & checks if the layer exists already
          // if (!map.current?.getLayer("NTLBrighter")) {
          //   map.current?.addLayer({
          //     id: "NTLBrighter",
          //     source: "NTLBrighter_tileset",
          //     type: "raster",
          //     layout: {
          //       visibility: "none",
          //     },
          //     paint: {
          //       "raster-color": "rgba(255,234,0,1)",
          //       "raster-opacity": 0.8, // Slightly transparent to give a glowing effect
          //       "raster-brightness-max": 1,
          //       "raster-contrast": 0.7,
          //     },
          //   });
          // }
        }
      });
    });

    // Add markers to the map to display the dark sky locations
    for (const feature of geoJSON.features) {
      // Create div for each element
      const el = document.createElement("div");
      el.className = "map-marker";
      el.setAttribute("data-category", feature.properties.category);

      const iconDiv = document.createElement("div");
      iconDiv.className = "icon-div";

      const root = createRoot(iconDiv);
      root.render(<IconComponent icon={MapPin} color="white" scale={20} />);
      el.appendChild(iconDiv);

      // Explicitly cast coordinates as tuple [number, number]
      const coordinates = feature.geometry.coordinates as [number, number];

      // make marker for each feature and add it to the map
      const marker = new mapboxgl.Marker(el).setLngLat(coordinates).setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            `<h3>${feature.properties.name}</h3><p>${feature.properties.description}</p>`
          )
      );

      // Store marker in the category array
      if (!markerMap[feature.properties.category]) {
        markerMap[feature.properties.category] = [];
      }
      markerMap[feature.properties.category].push(marker);

      // Add marker to map initially if 'Toggle All" is selected
      if (selectedLayer === "Toggle All") {
        marker.addTo(map.current!);
      }
    }
    // Gets and displays the following values as the user moves the map by updating the state of each variable
    map.current.on("move", () => {
      if (map.current !== null) {
        setDefaultLng(parseInt(map.current.getCenter().lng.toFixed(10)));
        setDefaultLat(parseInt(map.current.getCenter().lat.toFixed(10)));
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
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.current.addControl(new mapboxgl.ScaleControl(), "bottom-left");
    document
      .querySelector(".reset-map-view")
      ?.addEventListener("click", () => resetMapView());

    // These event listeners listen for events that trigger the loading spinner.
    map.current.on("load", () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    });
    map.current.on("idle", () => setIsLoading(false));

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(`Layer updated to: ${selectedLayer}`);
    updateMarkers(selectedLayer);
  }, [selectedLayer]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setSpinnerVisible(false);
      }, 500);
    }
  }, [isLoading]);

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

  // /**
  //  * Toggles the layers visibility on and off when called.
  //  * @param layerID
  //  */
  // const handleLayerToggle = (layerID: string) => {
  //   const visibility = map.current?.getLayoutProperty(layerID, "visibility");

  //   if (visibility === "visible") {
  //     map.current?.setLayoutProperty(layerID, "visibility", "none");
  //   } else {
  //     map.current?.setLayoutProperty(layerID, "visibility", "visible");
  //   }
  // };

  const handleDarkSkyLayerSelect = (layerId: string) => {
    setSelectedLayer(layerId);
    localStorage.setItem("selectedDarkSkyLayer", layerId);

    // setRefreshMarkers((prev) => !prev);
  };

  const updateMarkers = (layer: string) => {
    console.log(`Updating markers for category: ${layer}`);

    //Remove all markers from the map
    Object.values(markerMap).forEach((markers) => {
      markers.forEach((marker) => {
        marker.remove();
      });
    });

    switch (layer) {
      case darkSkyLayerCategories[0]: // Toggle All
        Object.values(markerMap).forEach((markers) => {
          markers.forEach((marker) => marker.addTo(map.current!));
        });
        break;
      case darkSkyLayerCategories[1]: // Dark Sky Reserves
        markerMap["Dark Sky Reserves"]?.forEach((marker) =>
          marker.addTo(map.current!)
        );
        break;
      case darkSkyLayerCategories[2]: // Dark Sky Sanctuaries
        markerMap["Dark Sky Sanctuaries"]?.forEach((marker) =>
          marker.addTo(map.current!)
        );
        break;
      case darkSkyLayerCategories[3]: // Dark Sky Parks
        markerMap["Dark Sky Parks"]?.forEach((marker) =>
          marker.addTo(map.current!)
        );
        break;
      case darkSkyLayerCategories[4]: // None
        // No need to add any markers for "None
        break;
      default:
        break;
    }

    // First, hide all markers
    // geoJSON.features.forEach((feature) => {
    //   const markerElement = document.querySelector(
    //     `[data-category="${feature.properties.category}"]`
    //   ) as HTMLElement;
    //   if (markerElement) {
    //     markerElement.style.display = "none"; // Hide initially
    //   }
    // });

    // Now show the selected category
    // geoJSON.features.forEach((feature) => {
    //   const markerElement = document.querySelector(
    //     `[data-category="${feature.properties.category}"]`
    //   ) as HTMLElement;

    //   if (markerElement) {
    //     console.log(
    //       `Marker for category: ${feature.properties.category}, Display: ${markerElement.style.display}`
    //     );
    //     switch (layer) {
    //       case darkSkyLayerCategories[0]: // Toggle All
    //         markerElement.style.display = "block";
    //         break;
    //       case darkSkyLayerCategories[1]: // Dark Sky Reserves
    //         markerElement.style.display =
    //           feature.properties.category === "Dark Sky Reserves"
    //             ? "block"
    //             : "none";
    //         break;
    //       case darkSkyLayerCategories[2]: // Dark Sky Sanctuaries
    //         markerElement.style.display =
    //           feature.properties.category === "Dark Sky Sanctuaries"
    //             ? "block"
    //             : "none";
    //         break;
    //       case darkSkyLayerCategories[3]: // Dark Sky Parks
    //         markerElement.style.display =
    //           feature.properties.category === "Dark Sky Parks"
    //             ? "block"
    //             : "none";
    //         break;
    //       case darkSkyLayerCategories[4]: // None
    //         markerElement.style.display = "none";
    //         break;
    //       default:
    //         markerElement.style.display = "none";
    //         break;
    //     }
    //   } else {
    //     console.log(
    //       `Marker for category ${feature.properties.category} not found.`
    //     );
    //   }
    // });

    // Debug: log visible markers
    // const visibleMarkers = Array.from(allMarkers).filter(
    //   (marker) => marker.style.display === "block"
    // );
    // console.log(`Visible markers: ${visibleMarkers.length}`, visibleMarkers);
  };

  return (
    <>
      {spinnerVisible && <LoadingSpinner />}
      <div className="content">
        <Nav>
          <NavItem path="/about" content="About" />
          <NavItem path="/darkSky" content="What is Dark Sky?" />
          <NavItem path="/nightTimeData" content="Nighttime Data" />
        </Nav>
        <div className="map">
          <div ref={mapContainer} className="map-container" />
          <SidePanel onLayerSelect={handleDarkSkyLayerSelect} />

          <div className="sidebar">
            <span className="sidebar-acknowledgements">
              Data Acknowledgements{" "}
              <button
                onClick={() => setAcknowledgeOpen(!acknowledgeOpen)}
                className="sidebar-acknowledgements-icon"
              >
                <IconComponent icon={InfoCircleOutline} size={18} />
              </button>
              {acknowledgeOpen ? <Acknowledgements /> : ""}
            </span>
            <span className="sidebar-geo-info">
              <button className="reset-map-view">Reset</button> | Longitude:{" "}
              {defaultLng} | Latitude: {defaultLat} | Zoom:
              {defaultZoom} | Pitch: {defaultPitch} | Bearing: {defaultBearing}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
