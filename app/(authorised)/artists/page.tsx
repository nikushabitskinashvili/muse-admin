/* eslint-disable */
"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./page.module.scss";
import { Button } from "@/app/Components/Buttons/Buttons";
import NewArtistModal from "@/app/Components/NewartistModal/NewArtistModal";
import ArtistCard from "@/app/Components/ArtistCard/ArtistCard";
import BaseApi from "@/app/api/baseApi";

interface Artist {
  id: string;
  name: string;
  title: string;
  subTitle: string;
  albumImg: string;
  image: string;
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

  const fetchArtists = async () => {
    try {
      const response = await BaseApi.get("/artist");
      setArtists(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
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
            {artists?.length > 0 ? (
                artists.map((item: Artist) => (
                    <ArtistCard key={item.id} name={item.title} item={item} />
                ))
            ) : (
                <p className={styles.noartist}>No artists available</p>
            )}
          </div>
        </div>

        {addPop && (
            <div className={styles.popBackground} onClick={closeAddPop}>
              <div ref={addPopRef} onClick={clickOnPop} className={styles.popContainer}>
                <NewArtistModal onClose={closeAddPop} refreshArtists={fetchArtists} />
              </div>
            </div>
        )}
      </div>
  );
};

export default ArtistPage;
