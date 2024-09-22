"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.scss";
import { Button } from "../Components/Buttons/Buttons";
import { ArtistCard } from "../Components/ArtistCard/ArtistCard";



interface Artist {
  id: string;
  title: string;
  src: string;
}

const ArtistPage = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
 

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("https://back.museappofficial.com/artist");
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
          <Button title="Add New Artist +" bg="pink" />
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
    </div>
  );
};

export default ArtistPage;
