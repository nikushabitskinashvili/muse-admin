"use client";
import { Button } from "@/app/Components/Buttons/Buttons";
import styles from "./page.module.scss";
import AlbumCard from "@/app/Components/AlbumCard/AlbumCard";
import { useRef, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import NewAlbumModal from "@/app/Components/NewAlbumModal/NewAlbumModal";
import BaseApi from "@/app/api/baseApi";
import { Playlist } from "@/app/interface/props.interface";
import { PlaylistItem } from "@/app/Components/PlaylistItem/PlaylistItem";

interface Album {
  music: Music[];
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

interface AlbumMusics {
  album: Album[];
}

const Page = () => {
  const [addPop, setAddPop] = useState(false);
  const addPopRef = useRef<HTMLDivElement>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [albumMusics, setAlbumMusics] = useState<AlbumMusics>({ album: [] });

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

  const fetchAlbums = useCallback(async () => {
    try {
      const response = await BaseApi.get(`/artist/${id}`);
      setAlbums(response.data.album);
      setAlbumMusics(response.data);
      return response.data.album;
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  }, [id]);

  const refreshAlbum = () => {
    fetchAlbums();
  };

  useEffect(() => {
    if (id) {
      fetchAlbums();
    }
  }, [id, fetchAlbums]);

  const handleDelete = async (playlistId: number) => {
    try {
      await BaseApi.delete(`albums/${playlistId}`);
      setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
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
              <AlbumCard
                refreshAlbum={refreshAlbum}
                key={item.id}
                name={item.title}
                item={item}
              />
            ))
          ) : (
            <p className={styles.noAlbum}>No Albums available</p>
          )}
        </div>
      </div>

      <div className={styles.musicList}>
        {albumMusics.album?.map((album: Album) => (
          <div key={album.id}>
            <h2
              style={{ color: "white", fontWeight: "bold", margin: "20px 0" }}
            >
              {album.title}
            </h2>
            {album?.music.map((music: Music) => (
              <div style={{ margin: "10px 0" }} key={music.id}>
                <PlaylistItem
                  id={music.id}
                  title={music.name}
                  onDelete={() => {
                    handleDelete(music.id);
                    refreshAlbum();
                  }}
                />
              </div>
            ))}
          </div>
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
