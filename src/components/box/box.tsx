import { HTMLProps } from "react";
import styles from "./box.module.scss";

interface BoxProps extends HTMLProps<HTMLDivElement> {
  boxHeading: string;
}

export default function Box({ boxHeading, children }: BoxProps) {
  return (
    <div className={styles.box}>
      <h1>{boxHeading}</h1>
      {children}
    </div>
  );
}
