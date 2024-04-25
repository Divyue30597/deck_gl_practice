import { Dispatch, SetStateAction, useState } from "react";
import { TProperty } from "../../types/types";

import styles from "./property.module.scss";

type PropertyProps = {
  setId: Dispatch<SetStateAction<number>>;
  property: TProperty[];
};

export default function Property({ property, setId }: PropertyProps) {
  const [searchVal, setSearchVal] = useState("");

  console.log(searchVal);

  return (
    <>
      <div>
        <input
          className={styles.input}
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>
      <hr />
      <ul className={styles.property}>
        {searchVal.length === 0
          ? property.map((feat_property) => {
              return (
                <li key={feat_property.id}>
                  <button onClick={() => setId(feat_property.id)}>
                    {feat_property.Locality}
                  </button>
                  <p>{feat_property.city}</p>
                </li>
              );
            })
          : property.map((feat_property) => {
              return searchVal.includes(feat_property.Locality) ? (
                <li key={feat_property.id}>
                  <button onClick={() => setId(feat_property.id)}>
                    {feat_property.Locality}
                  </button>
                  <p>{feat_property.city}</p>
                </li>
              ) : null;
            })}
      </ul>
    </>
  );
}
