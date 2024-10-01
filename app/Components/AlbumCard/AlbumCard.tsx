"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./AlbumCard.module.scss";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Button } from "../Buttons/Buttons";

const AlbumCard = ({
  item
}: {
  item: any;
  className?: string;
  name: string;
}) => {
  const [album, setAlbum] = useState<any | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await axios.get(`https://back.museappofficial.com/albums/${id}`, {
          headers: {
            "Content-Type": 'multipart/form-data',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyNzM1MjkyN30.Z174f2qBn0P4m9606SJMDQuvBYMxuDKbeMNi6YMsgoo'
          }
        });
        setAlbum(response.data);
      } catch (error) {
        alert("Error fetching album data");
      }
    };

    if (id) {
      fetchAlbumData();
    }
  }, [id]);

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes

  console.log(item);
  
  return (
<<<<<<< Updated upstream
    <>
      <Image className={styles.albumImg} src={item.image} alt={item.title} width={150} height={146} />
=======
    <div className={styles.albumCard}>
      <Image className={styles.albumImg} src={item.albumImg} alt={item.title} width={150} height={146} />
>>>>>>> Stashed changes
      <div className={styles.hoverbtn}>
        <Button bg={"blue"} title={"New Song"} />
      </div>
      <div className={styles.albumName}>
        <span className={styles.albumTitle}>{item.title}</span>
        <span className={styles.artistName}>{item.subTitle}</span>
      </div>
<<<<<<< Updated upstream
    </>
=======
    </div>

>>>>>>> Stashed changes
  )
};

export default AlbumCard;
