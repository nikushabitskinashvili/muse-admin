"use client"; 
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./ArtistCard.module.scss";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const ArtistCard = ({
    item 
}: {
    item: any;
    className?: string;
    name: string;
}) => {
    const [artist, setArtist] = useState<any | null>(null);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const response = await axios.get(`https://back.museappofficial.com/artist/${id}`, {
                    headers: {
                        "Content-Type": 'multipart/form-data',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyNzM1MjkyN30.Z174f2qBn0P4m9606SJMDQuvBYMxuDKbeMNi6YMsgoo' 
                    }
                });
                setArtist(response.data);
            } catch (error) {
                console.error("Error fetching artist data:", error);
            }
        };

        if (id) {
            fetchArtistData();
        }
    }, [id]); 
    
   

    return (
        <Link className={styles.artistCardContainer} href={`/artists/${item.id}`}>

            <Image
                src={item.image}
                width={130}
                height={126}
                alt={item.name}
                className={styles.cardImage}
            />
            <h2 className={styles.title}>{item.name}</h2>
        </Link>
    );
};

export default ArtistCard;
