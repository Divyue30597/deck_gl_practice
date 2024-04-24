import { HTMLProps } from "react";
import styles from "./box.module.scss";

interface BoxProps extends HTMLProps<HTMLDivElement> {
  boxHeading: string;
}

export default function Box({
  boxHeading,
  children,
  className,
  ...props
}: BoxProps) {
  return (
    <div className={`${styles.box} ${className}`} {...props}>
      <h1>{boxHeading}</h1>
      <hr />
      {children}
    </div>
  );
}
