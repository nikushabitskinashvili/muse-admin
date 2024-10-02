"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./ArtistCard.module.scss";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import BaseApi from "@/app/api/baseApi";

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
                const response = await BaseApi.get(`/artist/${id}`);
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
