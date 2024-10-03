"use client";
import styles from './NewAlbumModal.module.scss';
import React, { useState } from "react";
import { Button } from '../Buttons/Buttons';
import CloseButton from '../CloseButton/CloseButton';
import { useForm } from 'react-hook-form';
import { albumModal } from '@/app/interface/props.interface';
import { IconEnum } from '@/app/utlis/icons/icons';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import BaseApi from '@/app/api/baseApi';

interface NewAlbumModalProps extends albumModal {
    refreshArtists: () => void;
    artistId: number ;
}

const NewAlbumModal = (props: NewAlbumModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<albumModal>();

    const [selectedArtistImage, setSelectedArtistImage] = useState<string | null>(null);
    const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(null);

    const handleArtistImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedArtistImage(URL.createObjectURL(file));
        }
    };

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedCoverImage(URL.createObjectURL(file));
        }
    };


    let pathname = usePathname()
    let id = Number(pathname.slice(pathname.lastIndexOf("/") + 1));

    const onSubmit = async (values: albumModal) => {
        const data = new FormData();
        data.append("title", values.title);
        data.append("releaseDate", String(values.releaseDate));
        data.append("album", values.album[0]);
        data.append("artistId", String(id));


        reset();
        setSelectedArtistImage(null);
        setSelectedCoverImage(null);
        console.log(data);

        try {

            await BaseApi.post('/album', data);

            props.refreshArtists();
            props.onClose();
        } catch (error) {
            alert('Could not upload album!');
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <span className={styles.title}>{props.title}</span>
                <CloseButton onClick={props.onClose} bg={true} onClose={props.onClose} />

            </div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputs}>
                    <div className={styles.inputsWrapper}>
                        <label htmlFor="album" className={styles.img}>
                            <Image
                                src={selectedCoverImage || IconEnum.ALBUMUPLOAD}
                                alt="album"
                                width={466}
                                height={300}
                                style={{ cursor: 'pointer' }}
                            />
                            <input
                                className={styles.fileInput}
                                type="file"
                                id="album"
                                {...register('album', {
                                    required: true,
                                    onChange: handleCoverImageChange
                                })}
                            />
                        </label>
                    </div>
                    <div className={styles.inputsWrapper}>
                        <div className={styles.inp}>
                            <h2 className={styles.text}>Album Title</h2>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Album Title"
                                {...register('title', { required: true })}
                            />
                            {errors.title && <span className={styles.error}>Title is required</span>}

                        </div >

                        <div className={styles.inp}>
                            <h2 className={styles.text}>Album Release Date</h2>
                            <input
                                className={styles.input}
                                type='date'
                                {...register('releaseDate', {
                                    required: true,
                                })}
                            />
                        </div>
                        <Button bg={'pink'} title={"Add Album"} size={'huge'} />
                    </div >
                </div >
            </form >
        </div >
    );
};

export default NewAlbumModal;
