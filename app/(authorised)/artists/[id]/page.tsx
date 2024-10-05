"use client";
import { Button } from "@/app/Components/Buttons/Buttons";
import styles from "./page.module.scss";
import AlbumCard from "@/app/Components/AlbumCard/AlbumCard";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NewAlbumModal from "@/app/Components/NewAlbumModal/NewAlbumModal";
import BaseApi from "@/app/api/baseApi";
import { Playlist } from "@/app/interface/props.interface";
import { PlaylistItem } from "@/app/Components/PlaylistItem/PlaylistItem";

interface Album {
  id: number;
  title: string;
  src: string;
  subTitle: string;
  albumImg: string;
  description: string;
  img: string;
}

interface Music {
  id: number;
  name: string;
  artistId: number;
}

const Page = () => {
  const [addPop, setAddPop] = useState(false);
  const addPopRef = useRef<HTMLDivElement>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [musics, setMusics] = useState<Music[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  console.log(musics);

  const pathname = usePathname();
  const id = Number(pathname.slice(pathname.lastIndexOf("/") + 1));

  const fetchMusic = () => {
    BaseApi.get("/music")
      .then((response) => {
        const filteredData = response.data.filter((item: Music) => {
          return item.artistId === id;
        });
        setMusics(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching music data", error);
      });
  };

  const deleteMusic = async (id: number) => {
    BaseApi.delete(`music/${id}`)
      .then(() => {
        fetchMusic();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  useEffect(() => {
    fetchMusic();
  }, [id]);

  const toggleAddPop = () => {
    setAddPop(!addPop);
  };

  const clickOnPop = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const closeAddPop = () => {
    setAddPop(false);
  };

  const fetchAlbums = async () => {
    try {
      const response = await BaseApi.get(`/artist/${id}`);
      setAlbums(response.data.album);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchAlbums();
    }
  }, [id]);

  const refreshAlbum = () => {
    fetchAlbums();
  };

  const handleDelete = async (playlistId: number) => {
    try {
      await BaseApi.delete(`albums/${playlistId}`);
      setPlaylists(playlists.filter(playlist => playlist.id !== playlistId));
    } catch (error) {
      console.error("Failed to delete album.", error);
    }
  };

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
      <div className={styles.musicList}>
        {musics.map((music) => (
          <PlaylistItem
            id={music.id}
            key={music.id}
            title={music.name}
            onDelete={() => handleDelete(music.id)}
          />
        ))}
      </div>

      {addPop && (
        <div className={styles.popBackground} onClick={closeAddPop}>
          <div
            ref={addPopRef}
            onClick={clickOnPop}
            className={styles.popContainer}
          >
            <NewAlbumModal
              onClose={closeAddPop}
              refreshArtists={() => { }}
              title="Add Album"
              album=""
              releaseDate={0}
              artistId={id}
              refreshAlbum={refreshAlbum}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
