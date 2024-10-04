"use client";
import Image from "next/image";
import styles from "./ArtistCard.module.scss";
import Link from "next/link";


interface Artist {
    id: string;
    name: string;
    image: string;
    subTitle: string;
    albumImg: string;
}

const ArtistCard = ({
    item
}: {
    item: Artist;
    className?: string;
    name: string;
}) => {


    return (
        <Link className={styles.artistCardContainer} href={`/artists/${item.id}`}>
            <Image
                src={item.image}
                width={130}
                height={126}
                alt={item.name}
                className={styles.cardImage}
            />
            <h2 className={styles.title}>{item.name}</h2>
        </Link>
    );
};

export default ArtistCard;
