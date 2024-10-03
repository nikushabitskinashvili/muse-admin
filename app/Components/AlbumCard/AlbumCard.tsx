import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "./AlbumCard.module.scss";
import { useSearchParams } from "next/navigation";
import { Button } from "../Buttons/Buttons";
import NewSongModal from "../NewSongModal/NewSongModal";
import BaseApi from "@/app/api/baseApi";

const AlbumCard = ({
  item
}: {
  item: any;
  className?: string;
  name: string;
}) => {
  const [, setAlbum] = useState<any | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [addPop, setAddPop] = useState(false);
  const [currentAlbumId, setCurrentAlbumId] = useState<number | null>(null);
  const addPopRef = useRef<HTMLDivElement>(null);

  const toggleAddPop = (albumId: number) => {
    setCurrentAlbumId(albumId);
    setAddPop(!addPop);
  };

  const clickOnPop = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const closeAddPop = () => {
    setAddPop(false);
  };

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await BaseApi.get(`/albums/${id}`);
        setAlbum(response.data);
      } catch (error) {
        alert("Error fetching album data");
      }
    };

    if (id) {
      fetchAlbumData();
    }
  }, [id]);

  return (
    <div className={styles.albumCard}>
      <Image className={styles.albumImg} src={item.albumImg} alt={item.title} width={150} height={146} />
      <div className={styles.albumName}>
        <span className={styles.albumTitle}>{item.title}</span>
        <span className={styles.artistName}>{item.subTitle}</span>
      </div>
      <div className={styles.hoverbtn}>
        <Button bg={"blue"} title={"+ Add New Song"} onClick={() => toggleAddPop(item.id)} size={"big"} />
      </div>

      {addPop && (
        <div className={styles.popBackground} onClick={closeAddPop}>
          <div ref={addPopRef} onClick={clickOnPop} className={styles.popContainer}>
            <NewSongModal onClose={closeAddPop} refreshSongs={() => { }} albumId={currentAlbumId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
