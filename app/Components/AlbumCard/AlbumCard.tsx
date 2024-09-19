import styles from "./AlbumCard.module.scss";
import Image from "next/image";
import Link from "next/link";
interface AlbumCardProps {
    item: {
      id: string;
      img: string;
      title: string;
      subTitle: string;
    };
    className?: string;
    playlist?: boolean;
  }
  
  const AlbumCard = ({ item, className, playlist }: AlbumCardProps) => {
    const link = playlist ? `playlists/${item.id}` : `albums/${item.id}`;
  
    return (
      <Link className={`${styles.albumCard} ${className}`} href={link}>
        <Image
          className={styles.albumImg}
          src={item.img}
          alt={item.title}
          width={150}
          height={146}
        />
        <div className={styles.albumName}>
          <span className={styles.albumTitle}>{item.title}</span>
          <span className={styles.artistName}>{item.subTitle}</span>
        </div>
      </Link>
    );
  };
  
  export default AlbumCard;
  