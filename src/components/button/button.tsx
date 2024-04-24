import { ButtonHTMLAttributes } from "react";
import eye_open from "/eye_open.svg";
import eye_close from "/eye_close.svg";

import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btntext: string;
  toggle: boolean;
}

export default function Button({ btntext, toggle, ...props }: ButtonProps) {
  return (
    <button className={`${styles.button}`} {...props}>
      <span>{btntext}</span>
      {toggle ? (
        <img src={eye_close} alt="Hide Layer" width="24px" height="24px" />
      ) : (
        <img src={eye_open} alt="Show Layer" width="24px" height="24px" />
      )}
    </button>
  );
}
