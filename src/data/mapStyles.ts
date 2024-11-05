const paint = {
  gradient: {
    "raster-opacity": 0.8,
    "raster-color": [
      "interpolate", // This defines the interpolation expression
      ["linear"], // The interpolation method
      ["raster-value"], // The property being used for the color interpolation
      0,
      "rgba(0, 0, 0, 0)", // Mapping values to colors
      20,
      "hsl(240, 100%, 70%)",
      40,
      "hsl(180, 100%, 50%)",
      60,
      "hsl(120, 100%, 60%)",
      80,
      "hsl(120, 100%, 30%)",
      100,
      "hsl(60, 100%, 60%)",
      140,
      "hsl(60, 100%, 40%)",
      180,
      "hsl(30, 100%, 50%)",
      220,
      "hsl(0, 100%, 50%)",
      234,
      "hsl(0, 100%, 30%)",
    ],
    "raster-color-mix": [255, 0, 0, 1], // Make sure this is compatible
    "raster-color-range": [0, 234],
  },

  brighter: {
    "raster-color": "rgba(255,234,0,1)",
    "raster-opacity": 0.8,
    "raster-brightness-max": 1,
    "raster-contrast": 0.7,
  },
  darker: {
    "raster-color": "rgba(255,234,0,1)",
    "raster-opacity": 0.8,
    "raster-brightness-max": 1,
    "raster-contrast": 0.7,
  },
  none: {},
};

export default paint;
