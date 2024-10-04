"use client";
import { Button } from "@/app/Components/Buttons/Buttons";
import styles from "./page.module.scss";
import AlbumCard from "@/app/Components/AlbumCard/AlbumCard";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NewAlbumModal from "@/app/Components/NewAlbumModal/NewAlbumModal";
import BaseApi from "@/app/api/baseApi";

interface Album {
    id: number;
    title: string;
    src: string;
    subTitle: string;
    albumImg: string;
    description: string;
    img: string;
}

const Page = () => {
    const [addPop, setAddPop] = useState(false);
    const addPopRef = useRef<HTMLDivElement>(null);
    const [albums, setAlbums] = useState<Album[]>([]);

    const pathname = usePathname();
    const id = Number(pathname.slice(pathname.lastIndexOf("/") + 1));

    const toggleAddPop = () => {
        setAddPop(!addPop);
    };

    const clickOnPop = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const closeAddPop = () => {
        setAddPop(false);
    };

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await BaseApi.get(`/artist/${id}`);
                setAlbums(response.data.album);
            } catch (error) {
                console.error("Error fetching albums:", error);
            }
        };

        if (id) {
            fetchAlbums();
        }
    }, [id]);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.containerWrapper}>
                    <span className={styles.title}>Artist&apos;s Albums</span>
                    <div className={styles.btns}>
                        <Button title="Add Album +" bg="pink" onClick={toggleAddPop} />
                    </div>
                </div>

                <div className={styles.wrapper}>
                    {albums.length > 0 ? (
                        albums.map((item) => (
                            <AlbumCard key={item.id} name={item.title} item={item} />
                        ))
                    ) : (
                        <p className={styles.noAlbum}>No Albums available</p>
                    )}
                </div>
            </div>

            {addPop && (
                <div className={styles.popBackground} onClick={closeAddPop}>
                    <div ref={addPopRef} onClick={clickOnPop} className={styles.popContainer}>
                        <NewAlbumModal
                            onClose={closeAddPop}
                            refreshArtists={() => {}}
                            title="Add Album"
                            album=""
                            releaseDate={0}
                            artistId={id}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
