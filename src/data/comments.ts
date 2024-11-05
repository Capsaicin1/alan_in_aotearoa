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

// layers.overallChangeLayers.map(({ layer }) => {
//     map.current?.addSource(layer.name, {
//       type: "raster", // -> Always this
//       url: layer.url,
//       tileSize: 256, // -> Always this
//     });
//   });

//   layers.viirsLayers.map(({ layer }) => {
//     map.current?.addSource(layer.name, {
//       type: "raster",
//       url: layer.url,
//       tileSize: 256,
//     });
//   });

//   layers.overallChangeLayers.map(({ layer }) => {
//     if (map.current?.getLayer(layer.id)) return;
//     map.current?.addLayer({
//       id: layer.id,
//       source: layer.name,
//       type: "raster",
//       layout: {
//         visibility: "visible",
//       },
//       paint: layer.id === "NTLBrighter" ? paint.brighter : paint.darker,
//     });
//     // console.log(`Just added ${layer.name}`);
//   });

//   layers.viirsLayers.map(({ layer }) => {
//     if (map.current?.getLayer(layer.id)) return;
//     map.current?.addLayer({
//       id: layer.id,
//       source: layer.name,
//       maxzoom: 15,
//       minzoom: 0,
//       type: "raster",
//       layout: {
//         visibility: "visible",
//       },
//       paint: {
//         "raster-opacity": 0.8,
//         "raster-color": [
//           "interpolate", // This defines the interpolation expression
//           ["linear"], // The interpolation method
//           ["raster-value"], // The property being used for the color interpolation
//           0,
//           "rgba(0, 0, 0, 0)", // Mapping values to colors
//           20,
//           "hsl(240, 100%, 70%)",
//           40,
//           "hsl(180, 100%, 50%)",
//           60,
//           "hsl(120, 100%, 60%)",
//           80,
//           "hsl(120, 100%, 30%)",
//           100,
//           "hsl(60, 100%, 60%)",
//           140,
//           "hsl(60, 100%, 40%)",
//           180,
//           "hsl(30, 100%, 50%)",
//           220,
//           "hsl(0, 100%, 50%)",
//           234,
//           "hsl(0, 100%, 30%)",
//         ],
//         "raster-color-mix": [255, 0, 0, 1], // Make sure this is compatible
//         "raster-color-range": [0, 234],
//       },
//     });
//     // console.log(`Just added ${layer.name}`);
//   });

//   //Checks that the raster is loaded, and that is not already loaded, before adding it to the map.
//   map.current.on("data", (e) => {
//     if (e.isSourceLoaded) {
//       layers.overallChangeLayers.map(({ layer }) => {
//         if (map.current?.getLayer(layer.id)) return;
//         map.current?.addLayer({
//           id: layer.id,
//           source: layer.name,
//           type: "raster",
//           layout: {
//             visibility: "visible",
//           },
//           paint: layer.id === "NTLBrighter" ? paint.brighter : paint.darker,
//         });
//         // console.log(`Just added ${layer.name}`);
//       });
//       layers.viirsLayers.map(({ layer }) => {
//         if (map.current?.getLayer(layer.id)) return;
//         map.current?.addLayer({
//           id: layer.id,
//           source: layer.name,
//           maxzoom: 15,
//           minzoom: 0,
//           type: "raster",
//           layout: {
//             visibility: "visible",
//           },
//           paint: {
//             "raster-opacity": 0.8,
//             "raster-color": [
//               "interpolate", // This defines the interpolation expression
//               ["linear"], // The interpolation method
//               ["raster-value"], // The property being used for the color interpolation
//               0,
//               "rgba(0, 0, 0, 0)", // Mapping values to colors
//               20,
//               "hsl(240, 100%, 70%)",
//               40,
//               "hsl(180, 100%, 50%)",
//               60,
//               "hsl(120, 100%, 60%)",
//               80,
//               "hsl(120, 100%, 30%)",
//               100,
//               "hsl(60, 100%, 60%)",
//               140,
//               "hsl(60, 100%, 40%)",
//               180,
//               "hsl(30, 100%, 50%)",
//               220,
//               "hsl(0, 100%, 50%)",
//               234,
//               "hsl(0, 100%, 30%)",
//             ],
//             "raster-color-mix": [255, 0, 0, 1], // Make sure this is compatible
//             "raster-color-range": [0, 234],
//           },
//         });
//         // console.log(`Just added ${layer.name}`);
//       });
//       if (!map.current?.getLayer("NTLChangeAbs")) {
//         map.current?.addLayer({
//           id: "NTLChangeAbs",
//           source: "NTLChangeAbs_tileset",
//           type: "raster",
//           layout: {
//             visibility: "none",
//           },
//           /
//         });
//         console.log("raster is loaded");
//     }
//   });
// });

// useEffect(() => {
//     console.log(`NTL layer updated to ${selectedNTLlayer}`);

//     if (!map.current?.isStyleLoaded()) {
//       map.current?.on("style.load", () => {
//         updateNTLlayers(selectedNTLlayer);
//       });
//     } else {
//       updateNTLlayers(selectedNTLlayer);
//     }
//   }, [selectedNTLlayer]);

//   useEffect(() => {
//     console.log(`VIS layer updated to ${selectedVISlayer}`);

//     const handleIdle = () => {
//       updateVISlayers(selectedVISlayer);
//     };

//     if (!map.current?.isStyleLoaded()) {
//       console.log("style is loaded");
//       map.current?.on("style.load", () => {
//         // map.current?.on("idle", handleIdle);
//         updateVISlayers(selectedVISlayer);
//       });
//     } else {
//       // map.current?.on("idle", handleIdle);
//       updateVISlayers(selectedVISlayer);
//     }

//     return () => {
//       map.current?.off("idle", handleIdle);
//     };
//   }, [selectedVISlayer]);
