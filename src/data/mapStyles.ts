/**
 * The `paint` object defines various styles for raster layers in a map.
 *
 * It contains three main styles:
 *
 * 1. `gradient`: Defines a color gradient for raster layers using interpolation.
 *    - `raster-opacity`: Sets the opacity of the raster layer.
 *    - `raster-color`: Specifies the color interpolation based on raster values.
 *    - `raster-color-mix`: Defines the color mix for the raster layer.
 *    - `raster-color-range`: Sets the range of raster values for the color interpolation.
 *
 * 2. `brighter`: Defines a style with a brighter color for raster layers.
 *    - `raster-color`: Sets the color of the raster layer.
 *    - `raster-opacity`: Sets the opacity of the raster layer.
 *    - `raster-brightness-max`: Sets the maximum brightness of the raster layer.
 *    - `raster-contrast`: Sets the contrast of the raster layer.
 *
 * 3. `darker`: Defines a style with a darker color for raster layers.
 *    - `raster-color`: Sets the color of the raster layer.
 *    - `raster-opacity`: Sets the opacity of the raster layer.
 *    - `raster-brightness-max`: Sets the maximum brightness of the raster layer.
 *    - `raster-contrast`: Sets the contrast of the raster layer.
 */
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
};

export default paint;
