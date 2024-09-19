import React from "react";
import styles from "./AuthInput.module.scss";

export default function AuthInput({
  placeholder,
  type,
  value,
  onChange,
}: {
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      placeholder={placeholder}
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
