//### This is just a place for me to store some code snippets that I might want to reference later.

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
