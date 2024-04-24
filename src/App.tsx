import { APIProvider, Map, limitTiltRange } from "@vis.gl/react-google-maps";
import { GeoJsonLayer } from "@deck.gl/layers";
import { Accessor, Color, DeckGL, PolygonLayer } from "deck.gl";
import { useEffect, useState } from "react";

import styles from "./app.module.scss";

import Button from "./components/button/button";
import Box from "./components/box/box";
import { TFeature, featureCollection, TProperty } from "./types/types";
import Property from "./components/property/property";

const feature = {
  type: "Feature",
  properties: {
    id: 84539,
    ufi: "9100094640",
    city: "Gurugram",
    Locality: "Sector 82A",
  },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [76.956825, 28.386549],
        [76.967454, 28.392028],
        [76.971374, 28.38787],
        [76.972875, 28.386832],
        [76.973348, 28.386367],
        [76.972103, 28.385039],
        [76.971846, 28.38485],
        [76.970515, 28.383415],
        [76.967265, 28.381711],
        [76.966889, 28.382207],
        [76.965108, 28.382981],
        [76.964765, 28.382396],
        [76.962941, 28.383623],
        [76.959915, 28.382075],
        [76.959674, 28.381943],
        [76.956825, 28.386549],
      ],
    ],
  },
};

const INITIAL_STATE = {
  position: { lat: 28.457523, lng: 77.026344 },
  zoom: 11,
};

function App() {
  // Set toggle
  const [toggle, setToggle] = useState(true);
  // Set Color
  const [color, setColor] = useState<
    // @ts-ignore
    (Accessor<Feature<Geometry, any>, Color> & number[]) | undefined
  >([169, 198, 181, 100]);
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

    console.log(data)

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
    getFillColor: color,
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

  console.log(layers)

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
