// Define the shape of the data for each place.
// Each place has a name, location (lat/lng), description, and category (Sanctuary, Reserve, or Park).
interface Place {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  category: "Sanctuary" | "Reserve" | "Park"; // Restrict cat with union type.
}

// Array of places, each representing a Dark Sky location.
// These places will later be transformed into GeoJSON features.
const places: Place[] = [
  {
    name: "Aotea Great Barrier Island",
    location: { lat: -36.2, lng: 175.416667 },
    description: "Placeholder for description",
    category: "Sanctuary",
  },
  {
    name: "Kaikōura",
    location: { lat: -42.4, lng: 173.68 },
    description: "Placeholder for description",
    category: "Sanctuary",
  },
  {
    name: "Steward Island",
    location: { lat: -47, lng: 167.84 },
    description: "Placeholder for description",
    category: "Sanctuary",
  },
  {
    name: "Wairarapa International Dark Sky Reserve",
    location: { lat: -41.16, lng: 175.4 },
    description: "Placeholder for description",
    category: "Reserve",
  },
  {
    name: "Aoraki Mackenzie Dark Sky Reserve",
    location: { lat: -43.595, lng: 170.1418 },
    description: "Placeholder for description",
    category: "Reserve",
  },
  {
    name: "Wai-iti Dark Sky Park",
    location: { lat: -41.4299, lng: 172.9933 },
    description: "Placeholder for description",
    category: "Park",
  },
  {
    name: "Oxford Forest Conservation Area",
    location: { lat: -43.1341, lng: 172.0303 },
    description: "Placeholder for description",
    category: "Park",
  },
  {
    name: "Kawarau Gibbston Dark Sky Park",
    location: { lat: -45.0132, lng: 168.5723 },
    description: "Placeholder for description",
    category: "Park",
  },
];

// Function to generate a GeoJSON FeatureCollection from the array of places.
// GeoJSON is the format used by Mapbox to map geographical points or shapes.
const generateGeoJSON = (places: Place[]) => ({
  type: "FeatureCollection",

  // Each place is mapped to a Feature in GeoJSON
  features: places.map((place) => ({
    type: "Feature",

    // Specifies that we're dealing with points (i.e., map markers)
    geometry: {
      type: "Point",
      coordinates: [place.location.lng, place.location.lat],
    },

    // Non-geographical data associated with the point (name, description, and category)
    properties: {
      name: place.name,
      description: place.description,
      category: place.category,
    },
  })),
});

// Generate the GeoJSON from the places array and log it to the console for use in Mapbox.
const geoJSON = generateGeoJSON(places);
console.log(JSON.stringify(geoJSON, null, 2));

export default geoJSON;
