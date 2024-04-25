import { APIProvider, Map, limitTiltRange } from "@vis.gl/react-google-maps";
import { GeoJsonLayer } from "@deck.gl/layers";
import { DeckGL } from "deck.gl";
import { useEffect, useState } from "react";

import styles from "./app.module.scss";

import Button from "./components/button/button";
import Box from "./components/box/box";
import { TFeature, featureCollection, TProperty } from "./types/types";
import Property from "./components/property/property";

const INITIAL_STATE = {
  position: { lat: 28.457523, lng: 77.026344 },
  zoom: 11,
};

function App() {
  // Set toggle
  const [toggle, setToggle] = useState(true);
  // Set id
  const [id, setId] = useState<number>(0);
  // Set reqdata
  const [reqData, setReqData] = useState<featureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  const properties: TProperty[] = [];

  useEffect(() => {
    (async function () {
      const res = await fetch("http://localhost:8000/data");
      const data = await res.json();
      setReqData(data);
    })();
  }, []);

  useEffect(() => {
    function getIfIdIsPresent() {
      return reqData.features.filter((feature) => {
        return feature.properties.id === id;
      });
    }

    let data = getIfIdIsPresent();

    console.log(data);

    if (data[0]?.properties.id === id) {
      layers.push(
        new GeoJsonLayer({
          id: `GeoJsonLayer_${id}`,
          // @ts-ignore
          data: data[0],
          getFillColor: [0, 0, 0],
          getLineColor: [255, 255, 255],
          getLineWidth: 20,
        })
      );
    }
  }, [id]);

  reqData.features?.map((feature: TFeature) => {
    properties.push(feature.properties);
  });

  let layers = [];

  const layer = new GeoJsonLayer({
    id: "gurugram",
    data: "http://localhost:8000/data",
    fill: true,
    stroked: true,
    getFillColor: [169, 198, 181, 100],
    getLineColor: [169, 198, 181],
    // default is meters not pixels
    getLineWidth: 20,

    pickable: true,
    // onHover: (info, event) => console.log("Hovered:", info, event),
    // Callback when the pointer clicks on an object
    // onClick: (info, event) => console.log("Clicked:", info, event),
    visible: toggle,
  });

  layers.push(layer);

  console.log(layers);

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
        layers={[layers]}
      >
        <Map
          defaultCenter={INITIAL_STATE.position}
          defaultZoom={INITIAL_STATE.zoom}
          mapId={import.meta.env.VITE_GOOGLE_MAP_STYLE_ID}
          style={{ height: "100%", width: "100%" }}
        />
      </DeckGL>
      <Box boxHeading="Layers" className={styles.left_box}>
        {layers.map((_, index) => {
          return (
            <Button
              key={index}
              btntext="GeoJson Layer"
              toggle={toggle}
              onClick={() => setToggle(!toggle)}
            />
          );
        })}
      </Box>
      {toggle && (
        <Box boxHeading="Properties" className={styles.right_box}>
          <Property setId={setId} property={properties} />
        </Box>
      )}
    </APIProvider>
  );
}

export default App;
