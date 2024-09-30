"use client";
import { Button } from "@/app/Components/Buttons/Buttons";
import styles from "./page.module.scss";
import AlbumCard from "@/app/Components/AlbumCard/AlbumCard";
import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import NewAlbumModal from "@/app/Components/NewAlbumModal/NewAlbumModal";

interface Album {
    id: string;
    title: string;
    src: string;
}

const page = () => {
    const [addPop, setAddPop] = useState(false);
    const addPopRef = useRef<HTMLDivElement>(null);
    const [albums, setAlbums] = useState<Album[]>([]);
    const params = useParams();
    const artistId = params.artistId;

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
                const response = await axios.get(`https://back.museappofficial.com/artist/${artistId}`, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyNzM1MjkyN30.Z174f2qBn0P4m9606SJMDQuvBYMxuDKbeMNi6YMsgoo",
                    },
                });
                setAlbums(response.data);
            } catch (error) {
                console.error("Error fetching albums:", error);
            }
        };

        if (artistId) {
            fetchAlbums();
        }
    }, [artistId]);

    function fetchArtists(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.containerWrapper}>
                    <span className={styles.title}>Artist's Albums</span>
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
                        <NewAlbumModal onClose={closeAddPop} refreshArtists={fetchArtists} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default page;
