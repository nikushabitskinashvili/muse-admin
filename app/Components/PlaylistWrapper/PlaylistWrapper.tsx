'use client';

import { useEffect, useState } from "react";
import styles from "@/app/(authorised)/artists/page.module.scss";
import { PlaylistItem } from "../PlaylistItem/PlaylistItem";
import BaseApi from "@/app/api/baseApi";

interface Playlist {
    id: number;
    title: string;
    category: string;
}

 const playlistWrapper = () => {
    const [Playlists, setPlaylists] = useState<Playlist[]>([]);
    const [activeId, setActiveId] = useState<number | null>(null);

  

  
    const handleDelete = async (playlistId: number) => {
        try {
            await BaseApi.delete(`albums/${playlistId}`); 
            setPlaylists(Playlists.filter(playlist => playlist.id !== playlistId));
        } catch (error) {
            console.error("Failed to delete album.", error);
        }
    };


    return (
        <div className={styles.list}>
            {Playlists.map(playlist => (
                <PlaylistItem
                    id={playlist.id}
                    activeId={activeId}
                    setActiveId={setActiveId}
                    key={playlist.id}
                    title={playlist.title}
                    name={playlist.category}
                    onDelete={() => handleDelete(playlist.id)} 
                />
            ))}
        </div>
    );
};

export default playlistWrapper;
