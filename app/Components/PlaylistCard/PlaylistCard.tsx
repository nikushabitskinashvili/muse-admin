"use client";
import styles from "./PlaylistCard.module.scss";
import Link from "next/link";
import Image from "next/image";

const PlaylistCard = ({
  item,
  className,
}: {
  item: any;
  className?: string;
}) => {




  return (
    <Link className={`${styles.albumCard} ${className}`} href={`playlists/${item.id}`}>
      <Image className={styles.albumImg} src={item.img} alt={item.title} width={150} height={146} />
      <div className={styles.albumName}>
        <span className={styles.albumTitle}>{item.title}</span>
        <span className={styles.artistName}>{item.subTitle}</span>
      </div>
    </Link>
  );
}

export default PlaylistCard;
