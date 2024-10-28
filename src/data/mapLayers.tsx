// Interface representing a layer with its properties.
// name -> Layer name for display.
// type -> Type of the layer (e.g., "raster").
//url -> URL to access the layer's data.
interface Layer {
  name: string;
  id: string;
  layerType: string;
  url: string;
}
/**
 * Interface for overallChangeLayer
 * type -> type identifier
 * layer -> layer obj
 */
interface OverallChangeLayer {
  type: "overallChange";
  layer: Layer;
}

/**
 * Interface for viirsLayer
 * year -> corresponding year
 * layer -> layer obj
 */
interface ViirsLayer {
  year: number;
  layer: Layer;
}

// Main interface
interface Layers {
  overallChangeLayers: OverallChangeLayer[];
  viirsLayers: ViirsLayer[];
}

/**
 * Layers obj contains two arrays. Each array is an array of objects. The arrays allow me to map (loop)
 * over every object.
 */
const layers: Layers = {
  overallChangeLayers: [
    {
      type: "overallChange",
      layer: {
        name: "NTLBrighter_tileset",
        id: "NTLBrighter",
        layerType: "raster",
        url: "mapbox://julesishomie.32ae7f6m",
      },
    },
    //commented this one out for now because the styling isn't right and just makes everything yellow
    // {
    //   type: "overallChange",
    //   layer: {
    //     name: "NTLDarker_tileset",
    //     id: "NTLDarker",
    //     layerType: "raster",
    //     url: "mapbox://julesishomie.16zdzsub",
    //   },
    // },
  ],
  viirsLayers: [
    {
      year: 2012,
      layer: {
        name: "viirs2012",
        id: "2012",
        layerType: "raster",
        url: "mapbox://julesishomie.4uirg4op",
      },
    },
    {
      year: 2013,
      layer: {
        name: "viirs2013",
        id: "2013",
        layerType: "raster",
        url: "mapbox://julesishomie.b9krrxvj",
      },
    },
    {
      year: 2014,
      layer: {
        name: "viirs2014",
        id: "2014",
        layerType: "raster",
        url: "mapbox://julesishomie.bptwd62a",
      },
    },
    {
      year: 2015,
      layer: {
        name: "viirs2015",
        id: "2015",
        layerType: "raster",
        url: "mapbox://julesishomie.73ylq10w",
      },
    },
    {
      year: 2016,
      layer: {
        name: "viirs2016",
        id: "2016",
        layerType: "raster",
        url: "mapbox://julesishomie.54wyr09q",
      },
    },
    {
      year: 2017,
      layer: {
        name: "viirs2017",
        id: "2017",
        layerType: "raster",
        url: "mapbox://julesishomie.6lp07q15",
      },
    },
    {
      year: 2018,
      layer: {
        name: "viirs2018",
        id: "2018",
        layerType: "raster",
        url: "mapbox://julesishomie.1ia03hst",
      },
    },
    {
      year: 2019,
      layer: {
        name: "viirs2019",
        id: "2019",
        layerType: "raster",
        url: "mapbox://julesishomie.6xbgebk1",
      },
    },
    {
      year: 2020,
      layer: {
        name: "viirs2020",
        id: "2020",
        layerType: "raster",
        url: "mapbox://julesishomie.1b7qk9go",
      },
    },
    {
      year: 2021,
      layer: {
        name: "viirs2021",
        id: "2021",
        layerType: "raster",
        url: "mapbox://julesishomie.cis1kxze",
      },
    },
    {
      year: 2022,
      layer: {
        name: "viirs2022",
        id: "2022",
        layerType: "raster",
        url: "mapbox://julesishomie.1hnkwvqh",
      },
    },
    {
      year: 2023,
      layer: {
        name: "viirs2023",
        id: "2023",
        layerType: "raster",
        url: "mapbox://julesishomie.9ygumx4u",
      },
    },
  ],
};

const paint = {};
export { layers, paint };
