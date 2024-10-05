'use client';

import {useState } from "react";
import styles from "@/app/(authorised)/artists/page.module.scss";
import { PlaylistItem } from "../PlaylistItem/PlaylistItem";
import BaseApi from "@/app/api/baseApi";
import { Playlist } from "@/app/interface/props.interface";


 const PlaylistWrapper = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

  

  
    const handleDelete = async (playlistId: number) => {
        try {
            await BaseApi.delete(`albums/${playlistId}`); 
            setPlaylists(playlists.filter(playlist => playlist.id !== playlistId));
        } catch (error) {
            console.error("Failed to delete album.", error);
        }
    };


    return (
        <div className={styles.list}>
            {playlists.map(playlist => (
                <PlaylistItem
                    id={playlist.id}
                    key={playlist.id}
                    title={playlist.title}
                    name={playlist.category}
                    onDelete={() => handleDelete(playlist.id)} 
                />
            ))}
        </div>
    );
};

export default PlaylistWrapper;
