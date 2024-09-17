import styles from "./AuthButton.module.scss";

export default function AuthButton({
  buttonTitle,
  bgColor,
  titleColor,
  type
}: {
  buttonTitle: string;
  bgColor: string;
  titleColor: string;
  type:string
}) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: titleColor }}
      className={styles.btn}
    >
      {buttonTitle}
    </button>
  );
}
