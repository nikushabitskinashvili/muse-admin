'use client';
import { useEffect, useState } from 'react';
import PlaylistWrapper from '@/app/Components/PlaylistWrapper/PlaylistWrapper';
import styles from './page.module.scss';
import { useParams, useRouter } from 'next/navigation'; 
import HandleDelete from '@/app/Components/HandleDelete/HandleDelete';
import BaseApi from '@/app/api/baseApi';

interface Playlist {
    id: number;
    title: string;
}

const PlaylistDetailPage = () => {
    const { id } = useParams();
    const router = useRouter(); 
    const [playlist, setPlaylist] = useState<Playlist | null>(null); 

    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            try {
                const response = await BaseApi.get(`/playlists/${id}`); 
                setPlaylist(response.data);
            } catch (error) {
                console.error('Failed to fetch playlist details', error);
            }
        };

        if (id) {
            fetchPlaylistDetails();
        }
    }, [id]);

    const handleDelete = async () => {
        try {
            await BaseApi.delete(`/playlists/${id}`); 
            router.push('/playlists'); 
        } catch (error) {
            console.error('Failed to delete playlist', error);
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.PlaylistDetails}>
                <div className={styles.PlaylistDetailsTxt}>
                    <h1>{playlist?.title}</h1> 
                    <div className={styles.PlaylistDetailsWrapper}>
                        <HandleDelete 
                            id={playlist?.id || 0} 
                            onDelete={handleDelete}  
                        />
                    </div>
                </div>
                <div className={styles.list}>
                    <PlaylistWrapper />
                </div>
            </div>
        </main>
    );
};

export default PlaylistDetailPage;
