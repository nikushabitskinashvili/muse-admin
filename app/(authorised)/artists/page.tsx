import { ArtistCard } from "@/app/Components/ArtistCard/ArtistCard";
import styles from "./page.module.scss";

interface Artist {
    id: string;
    title: string;
    src: string
}

const artist: Artist[] = [
    { id: "1", title: "Artist One", src: "/images/artist.png" },
    { id: "2", title: "Artist Two", src: "/images/artist.png" },
    { id: "3", title: "Artist Three", src: "/images/artist.png" },
    { id: "4", title: "Artist Three", src: "/images/artist.png" },
    { id: "5", title: "Artist Three", src: "/images/artist.png" },
    { id: "6", title: "Artist Three", src: "/images/artist.png" },
    { id: "7", title: "Artist Three", src: "/images/artist.png" },
    { id: "8", title: "Artist Three", src: "/images/artist.png" },
    { id: "9", title: "Artist Three", src: "/images/artist.png" },
    { id: "10", title: "Artist Three", src: "/images/artist.png" },
];

export default function artists() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.containerWrapper}>
                    <span className={styles.title}>Artists</span>

                </div>
                <div className={styles.wrapper}>
                    {artist.map((item) => (
                        <ArtistCard key={item.id} title={item.title} item={item} />
                    ))}
                </div>
            </div>
        </main>
    );
}


