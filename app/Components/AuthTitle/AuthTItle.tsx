import styles from "./AuthTitle.module.scss";

export default function AuthTitle({ title }: { title: string }) {
  return <h1 className={styles.title}>{title}</h1>;
}
