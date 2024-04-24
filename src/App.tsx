import { APIProvider, Map, limitTiltRange } from "@vis.gl/react-google-maps";
import { GeoJsonLayer } from "@deck.gl/layers";
import { DeckGL } from "deck.gl";
import { useState } from "react";
import Button from "./components/button/button";
import Box from "./components/box/box";

const INITIAL_STATE = {
  position: { lat: 28.457523, lng: 77.026344 },
  // position: { lat: 37.74, lng: -122.4 },
  zoom: 11,
};

function App() {
  const [toggle, setToggle] = useState(true);

  const layers = new GeoJsonLayer({
    id: "gurugram",
    data: "http://localhost:8000/data",
    fill: true,
    getFillColor: [169, 198, 181, 100],
    getLineColor: [169, 198, 181],
    getLineWidth: 20,
    visible: toggle,
  });

  return (
    <APIProvider apiKey={import.meta.env.VITE_REACT_GOOGLE_MAP}>
      <DeckGL
        initialViewState={{
          longitude: INITIAL_STATE.position.lng,
          latitude: INITIAL_STATE.position.lat,
          zoom: INITIAL_STATE.zoom,
        }}
        onViewStateChange={limitTiltRange}
        controller={true}
        // @ts-ignore
        layers={layers}
      >
        <Map
          defaultCenter={INITIAL_STATE.position}
          defaultZoom={INITIAL_STATE.zoom}
          mapId={import.meta.env.VITE_GOOGLE_MAP_STYLE_ID}
          style={{ height: "100%", width: "100%" }}
        />
      </DeckGL>
      <Box boxHeading="Layers">
        <Button
          btntext="GeoJson Layer"
          toggle={toggle}
          onClick={() => setToggle(!toggle)}
        />
      </Box>
    </APIProvider>
  );
}

export default App;
