import { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "../styles/App.css";
import geoJSON from "../data/darkSkyLocations.ts";
import paint from "../data/mapStyles.ts";
import { layers, Layer } from "../data/mapLayers.tsx";

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
  const [sourcesLoaded, setSourcesLoaded] = useState(false);
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  // const [refreshMarkers, setRefreshMarkers] = useState(false);
  const [selectedDSlayer, setSelectedDSLayer] = useState<string>(() => {
    return localStorage.getItem("selectedDarkSkyLayer") || "Toggle All";
  });

  const [selectedNTLlayer, setSelectedNTLlayer] = useState<string>(() => {
    return localStorage.getItem("selectedNTLlayer") || "None";
  });

  const [selectedVISlayer, setSelectedVISlayer] = useState<string>(() => {
    return localStorage.getItem("selectedVISlayer") || "none";
  });

  //Constants
  // const activeLayerIDs = ["NTLChangeAbs", "NTLBrighter"];
  const style = "mapbox://styles/julesishomie/clwycze8h019801pp1qto1bwq";

  const darkSkyLayerCategories = [
    "Toggle All",
    "Dark Sky Reserves",
    "Dark Sky Sanctuaries",
    "Dark Sky Parks",
    "None",
  ];

  const NTLlayersIDs = [
    layers.overallChangeLayers[0].layer.id, // Brighter
    // layers.overallChangeLayers[1].layer.id,  Darker
    "None",
  ];

  const VISlayerIDs = [
    layers.viirsLayers[0].layer.id, //2012
    layers.viirsLayers[1].layer.id, //2013
    layers.viirsLayers[2].layer.id, //2014
    layers.viirsLayers[3].layer.id, //2015
    layers.viirsLayers[4].layer.id, //2016
    layers.viirsLayers[5].layer.id, //2017
    layers.viirsLayers[6].layer.id, //2018
    layers.viirsLayers[7].layer.id, //2019
    layers.viirsLayers[8].layer.id, //2020
    layers.viirsLayers[9].layer.id, //2021
    layers.viirsLayers[10].layer.id, //2022
    layers.viirsLayers[11].layer.id, //2023
    "none",
  ];
  interface change {
    layerID: string;
    flag: "dks" | "vis" | "ntl";
  }

  const markerMap: { [category: string]: mapboxgl.Marker[] } = {};
  // const sourceMap: { [category: string]: mapboxgl.RasterSource[] } = {};

  // const addRasterLayer = (layerArg: Layer) => {
  //   if (map.current?.isStyleLoaded()) {
  //     if (map.current?.getSource(layerArg.name)) return;
  //     map.current?.addLayer({
  //       id: layerArg.id,
  //       type: "raster",
  //       source: layerArg.name,
  //       paint:
  //       layerArg.name.includes("NTL") === true
  //           ? paint.brighter
  //           : layerArg.name.includes("viirs") === true
  //           ? paint.gradient
  //           : paint.none,
  //     });
  //   } else {
  //     map.current?.on("style.load", () => {
  //       if (map.current?.getSource(layerArg.name)) return;
  //       map.current?.addLayer({
  //         id: layerArg.id,
  //         type: "raster",
  //         source: layerArg.name,
  //       });
  //     });
  //   }
  // };

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
      let sources = 0;
      console.log(sources);
      for (const layer of layers.overallChangeLayers) {
        console.log("for loop");
        console.log(map.current.getSource(layer.layer.name));
        if (map.current.getSource(layer.layer.name)) return;
        console.log("if statement");
        map.current.addSource(layer.layer.name, {
          type: "raster",
          url: layer.layer.url,
          tileSize: 256,
        });

        sources++;
      }

      for (const layer of layers.viirsLayers) {
        if (map.current.getSource(layer.layer.name)) return;
        map.current.addSource(layer.layer.name, {
          type: "raster",
          url: layer.layer.url,
          tileSize: 256,
        });
        sources++;
      }
      console.log(sources);
    });

    map.current.on("sourcedata", (e) => {
      if (e.isSourceLoaded) {
        setSourcesLoaded(true);
      }
    });

    map.current.on("style.import.load", () => {
      console.log("style loaded");
      if (map.current?.isStyleLoaded()) {
        setStylesLoaded(true);
      }
    });

    console.log(map.current.getLayer("NTLBrighter"));
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
      if (selectedDSlayer === "Toggle All") {
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
    console.log(`DS layer updated to: ${selectedDSlayer}`);

    if (!map.current?.isStyleLoaded()) {
      map.current?.on("style.load", () => {
        updateMarkers(selectedDSlayer);
      });
    } else {
      updateMarkers(selectedDSlayer);
    }
  }, [selectedDSlayer]);

  useEffect(() => {
    console.log(`NTL layer updated to ${selectedNTLlayer}`);
    console.log(map.current?.isStyleLoaded());
    const currentLayer = layers.overallChangeLayers.find(
      (layer) => layer.layer.id === selectedNTLlayer
    )?.layer;

    if (currentLayer) {
      addRasterLayer(currentLayer);
    }

    console.log(currentLayer);
    return () => {
      if (currentLayer) {
        removeRasterLayer(currentLayer);
      }
    };
  }, [sourcesLoaded, selectedNTLlayer, stylesLoaded]);

  useEffect(() => {
    console.log(`VIS layer updated to ${selectedVISlayer}`);

    const currentLayer = layers.viirsLayers.find(
      (layer) => layer.layer.id === selectedVISlayer
    )?.layer;

    if (currentLayer) {
      addRasterLayer(currentLayer);
    }

    return () => {
      if (currentLayer) {
        removeRasterLayer(currentLayer);
      }
    };
  }, [sourcesLoaded, selectedVISlayer, stylesLoaded]);

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

  const addRasterLayer = (layerArg: Layer) => {
    if (!map.current?.getSource(layerArg.name)) {
      map.current?.addLayer({
        id: layerArg.id,
        type: "raster",
        source: layerArg.name,
        paint:
          layerArg.name.includes("NTL") === true
            ? paint.brighter
            : layerArg.name.includes("viirs") === true
            ? paint.gradient
            : paint.none,
      });
    } else {
      console.log("source doesn't exist");
    }
  };

  function removeRasterLayer(layer: Layer) {
    if (map.current?.getLayer(layer.id)) {
      map.current?.removeLayer(layer.id);
      map.current?.removeSource(layer.name);
    }
  }

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

  const recordChanges = (changes: change[]) => {
    changes.forEach((change) => {
      if (change.flag === "dks") {
        setSelectedDSLayer(change.layerID);
        localStorage.setItem("selectedDarkSkyLayer", change.layerID);
      } else if (change.flag === "ntl") {
        setSelectedNTLlayer(change.layerID);
        localStorage.setItem("selectedNTLlayer", change.layerID);
      } else if (change.flag === "vis") {
        setSelectedVISlayer(change.layerID);
        localStorage.setItem("selectedVISlayer", change.layerID);
      }
    });
  };

  function updateMarkers(layer: string) {
    // console.log(`Updating markers for category: ${layer}`);

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
  }

  const updateNTLlayers = (layer: string) => {
    if (map.current?.getLayer(layer)) {
      if (layer === NTLlayersIDs[0]) {
        // Brighter
        map.current?.setLayoutProperty(NTLlayersIDs[1], "visibility", "none");
        map.current?.setLayoutProperty(
          NTLlayersIDs[0],
          "visibility",
          "visible"
        );
      } else if (layer === NTLlayersIDs[1]) {
        //Darker
        map.current?.setLayoutProperty(NTLlayersIDs[0], "visibility", "none");
        map.current?.setLayoutProperty(
          NTLlayersIDs[1],
          "visibility",
          "visible"
        );
      } else if (layer === NTLlayersIDs[2]) {
        map.current?.setLayoutProperty(NTLlayersIDs[0], "visibility", "none");
        map.current?.setLayoutProperty(NTLlayersIDs[1], "visibility", "none");
      }
    } else {
      console.warn(`Layer '${layer}' does not exist in the map's style.`);
    }
  };

  const updateVISlayers = (layer: string) => {
    console.log("function was called");
    console.log(layer);

    const layerExists = map.current?.getLayer(layer);

    console.log(layerExists);
    if (layerExists) {
      console.log("layer exists");
      switch (layer) {
        // case VISlayerIDs[0]:
        case "2012":
          console.log("in 12");
          VISlayerIDs.forEach((layer) => {
            map.current?.setLayoutProperty(layer, "visibility", "none");
          });
          map.current?.setLayoutProperty(
            VISlayerIDs[0],
            "visibility",
            "visible"
          );
          break;
        case VISlayerIDs[1]:
          VISlayerIDs.forEach((layer) => {
            map.current?.setLayoutProperty(layer, "visibility", "none");
          });
          map.current?.setLayoutProperty(
            VISlayerIDs[1],
            "visibility",
            "visible"
          );
          break;
        case VISlayerIDs[2]:
          VISlayerIDs.forEach((layer) => {
            map.current?.setLayoutProperty(layer, "visibility", "none");
          });
          map.current?.setLayoutProperty(
            VISlayerIDs[2],
            "visibility",
            "visible"
          );
          break;
        case VISlayerIDs[3]:
          VISlayerIDs.forEach((layer) => {
            map.current?.setLayoutProperty(layer, "visibility", "none");
          });
          map.current?.setLayoutProperty(
            VISlayerIDs[3],
            "visibility",
            "visible"
          );
          break;
        case VISlayerIDs[4]:
          VISlayerIDs.forEach((layer) => {
            map.current?.setLayoutProperty(layer, "visibility", "none");
          });
          map.current?.setLayoutProperty(
            VISlayerIDs[4],
            "visibility",
            "visible"
          );
          break;
        case VISlayerIDs[5]:
          VISlayerIDs.forEach((layer) => {
            map.current?.setLayoutProperty(layer, "visibility", "none");
          });
          map.current?.setLayoutProperty(
            VISlayerIDs[5],
            "visibility",
            "visible"
          );
          break;
        case VISlayerIDs[6]:
          VISlayerIDs.forEach((layer) => {
            map.current?.setLayoutProperty(layer, "visibility", "none");
          });
          map.current?.setLayoutProperty(
            VISlayerIDs[6],
            "visibility",
            "visible"
          );
          break;
        case VISlayerIDs[7]:
          VISlayerIDs.forEach((layer) => {
            map.current?.setLayoutProperty(layer, "visibility", "none");
          });
          map.current?.setLayoutProperty(
            VISlayerIDs[7],
            "visibility",
            "visible"
          );
          break;
        case VISlayerIDs[8]:
          VISlayerIDs.forEach((layer) => {
            map.current?.setLayoutProperty(layer, "visibility", "none");
          });
          map.current?.setLayoutProperty(
            VISlayerIDs[8],
            "visibility",
            "visible"
          );
          break;
        case VISlayerIDs[9]:
          VISlayerIDs.forEach((layer) => {
            map.current?.setLayoutProperty(layer, "visibility", "none");
          });
          map.current?.setLayoutProperty(
            VISlayerIDs[9],
            "visibility",
            "visible"
          );
          break;
        case VISlayerIDs[10]:
          VISlayerIDs.forEach((layer) => {
            map.current?.setLayoutProperty(layer, "visibility", "none");
          });
          map.current?.setLayoutProperty(
            VISlayerIDs[10],
            "visibility",
            "visible"
          );
          break;
        case VISlayerIDs[11]:
          VISlayerIDs.forEach((layer) => {
            map.current?.setLayoutProperty(layer, "visibility", "none");
          });
          map.current?.setLayoutProperty(
            VISlayerIDs[11],
            "visibility",
            "visible"
          );
          break;
        case VISlayerIDs[12]:
          // VISlayerIDs.forEach((layer) => {
          //   map.current?.setLayoutProperty(layer, "visibility", "none");
          // });
          VISlayerIDs.filter((layer) => layer !== "none").forEach((layer) => {
            map.current?.setLayoutProperty(layer, "visibility", "none");
          });
          break;
      }
    } else {
      console.warn(`Layer '${layer}' does not exist in the map's style.`);
    }
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
          <SidePanel onLayerSelect={recordChanges} />

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
