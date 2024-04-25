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
        {property.map((feat_property) => {
          const isMatch =
            searchVal.length === 0 ||
            searchVal.includes(feat_property.Locality);

          // Only render if there's a match
          return (
            <li
              key={feat_property.id}
              style={{ display: isMatch ? "flex" : "none" }}
            >
              <button onClick={() => setId(feat_property.id)}>
                {feat_property.Locality}
              </button>
              <p>{feat_property.city}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
