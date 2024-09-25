"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaylistCard from '@/app/Components/PlaylistCard/PlaylistCard';
import styles from './page.module.scss';
import CloseButton from '@/app/Components/CloseButton/CloseButton';
import Link from 'next/link';

interface Album {
    id: string;
    title: string;
    imageUrl: string;
}

const Albums = () => {
    const [Playlist, setPlaylist] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get('https://back.museappofficial.com/albums/popular');
                setPlaylist(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load albums');
                setLoading(false);
            }
        };

        fetchAlbums();
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.mainWrapper}>
                <div className={styles.albumTxt}>
                    <span>user's playlists</span>
                    <Link href={"/"}>
                        <CloseButton bg={true} />
                    </Link>

                </div>
                <div className={styles.container}>
                    {Playlist.map((item) => (
                        <PlaylistCard
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Albums;
