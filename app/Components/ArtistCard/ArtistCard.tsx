import Image from "next/image";
import React from "react";
import styles from "./ArtistCard.module.scss";
import Link from "next/link";

export const ArtistCard = ({title, item}: { title: string; item: any }) => {
    return (
        <Link className={styles.artistCardContainer} href={`artists/${item.id}`}>
            <Image
                src={item.img}
                width={130}
                height={126}
                alt={item.title}
                className={styles.cardImage}
            />
            <h2 className={styles.title}>{item.title}</h2>
        </Link>
    );
};
