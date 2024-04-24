import { Dispatch, SetStateAction } from "react";
import { TProperty } from "../../types/types";

import styles from "./property.module.scss";

type PropertyProps = {
  setId: Dispatch<SetStateAction<number>>;
  property: TProperty[];
};

export default function Property({ property, setId }: PropertyProps) {
  return (
    <ul className={styles.property}>
      {property.map((feat_property) => {
        return (
          <li key={feat_property.id}>
            <button onClick={() => setId(feat_property.id)}>
              {feat_property.Locality}
            </button>
            <p>{feat_property.city}</p>
          </li>
        );
      })}
    </ul>
  );
}
