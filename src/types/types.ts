export type TProperty = {
  id: number;
  ufi: string;
  city: string;
  Locality: string;
};

export type TFeature = {
  type: "Feature";
  properties: TProperty;
  geometry:
    | {
        type: "Polygon" | "MultiPolygon";
        coordinates: [number, number][][];
      }
    | undefined;
};

export type featureCollection = {
  type: "FeatureCollection";
  features: TFeature[];
};
