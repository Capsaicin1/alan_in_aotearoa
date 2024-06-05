import React, { useState, useRef, useEffect } from "react";
import "./App.css";

import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

function App() {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(172);
  const [lat, setLat] = useState(-41);
  const [zoom, setZoom] = useState(4);
  const [pitch, setPitch] = useState(52);
  const [bearing, setBearing] = useState(-9);
  //const style = "mapbox://styles/julesishomie/clwycze8h019801pp1qto1bwq";

  useEffect(() => {
    if (map.current) return; //initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/julesishomie/clwycze8h019801pp1qto1bwq",
      center: [lng, lat],
      zoom,
      pitch,
      bearing,
    });

    map.current.on("move", () => {
      if (map.current !== null) {
        setLng(parseInt(map.current.getCenter().lng.toFixed(4)));
        setLat(parseInt(map.current.getCenter().lat.toFixed(4)));
        setZoom(parseInt(map.current.getZoom().toFixed(2)));
        setPitch(parseInt(map.current.getPitch().toFixed(2)));
        setBearing(parseInt(map.current.getBearing().toFixed(3)));
      }
    });

    map.current.scrollZoom.disable();
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
  });

  return (
    <>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | Pitch: {pitch} |
        Bearing: {bearing}
      </div>
      <div ref={mapContainer} className="map-container" />
    </>
  );
}

export default App;
