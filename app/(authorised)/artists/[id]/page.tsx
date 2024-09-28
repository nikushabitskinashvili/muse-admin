"use client"
import { Button } from "@/app/Components/Buttons/Buttons";
import styles from "./page.module.scss";
import AlbumCard from "@/app/Components/AlbumCard/AlbumCard";
import { useRef, useState } from "react";
import CloseButton from "@/app/Components/CloseButton/CloseButton";
import { Props } from "@/app/interface/props.interface";
import Link from "next/link";

interface Album {
    id: string;
    title: string;
    src: string;
}


const page = (props: Props) => {
    const [addPop, setAddPop] = useState(false);
    const addPopRef = useRef<HTMLDivElement>(null);
    const [Albums, setAlbums] = useState<Album[]>([]);


    const toggleAddPop = () => {
        setAddPop(!addPop);
    };

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.containerWrapper}>
                    <span className={styles.title}>Artist's Albums</span>
                    <div className={styles.btns}>
                        <Button title="Add Album +" bg="pink" onClick={toggleAddPop} />
                        <Link href={"/"}>
                            <CloseButton bg={true} />
                        </Link>
                    </div>
                </div>

                <div className={styles.wrapper}>
                    {Albums.length > 0 ? (
                        Albums.map((item) => (
                            <AlbumCard key={item.id} name={item.title} item={item} />
                        ))
                    ) : (
                        <p className={styles.noAlbum}>No Albums available</p>
                    )}
                </div>
            </div>


        </div>

    )
}

export default page