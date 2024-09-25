"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ArtistCard } from "@/app/Components/ArtistCard/ArtistCard";
import styles from "./page.module.scss";
import { Button } from "@/app/Components/Buttons/Buttons";
import NewArtistModal from "@/app/Components/NewartistModal/NewArtistModal";

interface Artist {
  id: string;
  title: string;
  src: string;
}

const ArtistPage = () => {
  const [addPop, setAddPop] = useState(false);
  const addPopRef = useRef<HTMLDivElement>(null);
  const [artists, setArtists] = useState<Artist[]>([]);

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
    const fetchArtists = async () => {
      try {
        const response = await axios.get("http://10.10.50.201:3000/artist");
        setArtists(response.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.containerWrapper}>
          <span className={styles.title}>The Artists</span>
          <Button title="Add New Artist +" bg="pink" onClick={toggleAddPop} />
        </div>

        <div className={styles.wrapper}>
          {artists.length > 0 ? (
            artists.map((item) => (
              <ArtistCard key={item.id} title={item.title} item={item} />
            ))
          ) : (
            <p>No artists available</p>
          )}
        </div>
      </div>

      {addPop && (
        <div className={styles.popBackground} onClick={closeAddPop}>
          <div
            ref={addPopRef}
            onClick={clickOnPop}
            className={styles.popContainer}
          >
            <NewArtistModal
              onClose={closeAddPop}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistPage;
