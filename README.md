# Created a simple application using deck.gl

- Used deck.gl to view geojson layers
- Used Google maps for the base map
- Used `@vis.gl/react-google-maps` as wrapper around google maps and deck.gl and it makes easy to interact with google maps.

## Tasks completed

### Try to implement as much of this as you can:

- [x] Full screen map (mapbox, google, anything)
- [x] Overlay panels on left and right side
- [x] Visualize loc.geojson on map as an extra layer (use the maps SDK or deck.gl)
- [x] Left panel will show list of layers (1 or 2 is enough)
- [x] Hover styles on left panel layer list, and an eye icon to toggle the visibility of the layer on and off

## In order to run this project

- Clone it, and install all dependencies using `yarn` or `npm`.
- I am using `json-server`, so run `yarn server` in one terminal and `yarn dev` in another.
- Before this, I am using google as base map, so, don't forget to add your own google map API key in .env file under `VITE_REACT_GOOGLE_MAP`.
- `VITE_GOOGLE_MAP_STYLE_ID` is not necessary.
