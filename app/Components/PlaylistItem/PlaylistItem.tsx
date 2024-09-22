'use client';
import styles from "./PlaylistItem.module.scss";
import React, { useEffect, useState } from "react";
import HandleDelete from "../HandleDelete/HandleDelete";

interface Props {
    audioSrc?: string;
    title?: string;
    name?: string;
    id: number;
    className?: string;
    setActiveId: (data: number | null) => void;
    activeId: number | null;
    onDelete: (id: number) => void;
}

export const PlaylistItem = (props: Props) => {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audioObj = new Audio(props.audioSrc);
        setAudio(audioObj);

        return () => {
            audioObj.pause();
            audioObj.currentTime = 0;
            setAudio(null);
        };
    }, [props.audioSrc]);

    const isActive = props.activeId === props.id;
    const onClick = () => {
        isActive ? props.setActiveId(null) : props.setActiveId(props.id);

        if (audio) {
            audio.play();
        }
    };

    const classNames = [styles.playlistItem];
    if (isActive) classNames.push(styles.active);

    return (
        <div className={classNames.join(' ').trim()} onClick={onClick}>
            <div className={styles.leftSection}>
                <div className={styles.text}>
                    <span>{`${props.title} - ${props.name}`}</span>
                </div>
            </div>
            <div className={styles.rightSection}>
                <HandleDelete
                    id={props.id}
                    onDelete={(id) => props.onDelete(id)}
                />
            </div>
        </div>
    );
};