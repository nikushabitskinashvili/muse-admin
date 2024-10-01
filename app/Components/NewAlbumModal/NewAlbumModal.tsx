"use client";
import styles from './NewAlbumModal.module.scss';
import React, { useState } from "react";
import { Button } from '../Buttons/Buttons';
import CloseButton from '../CloseButton/CloseButton';
import { useForm } from 'react-hook-form';
import { albumModal } from '@/app/interface/props.interface';
import axios from 'axios';
import { IconEnum } from '@/app/utlis/icons/icons';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';

interface NewAlbumModalProps extends albumModal {
    refreshArtists: () => void;
    artistId: string | number;
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
<<<<<<< Updated upstream
        data.append("releaseDate", String(values.releaseDate))
        data.append("album", values.album[0]);
        data.append("artistId", String(values.artistId))

        console.log(values, "sbdsdh");

=======
        data.append("releaseDate", String(values.releaseDate));
        data.append("album", values.album[0]);
        data.append("artistId", String(id));
>>>>>>> Stashed changes

        reset();
        setSelectedArtistImage(null);
        setSelectedCoverImage(null);
        console.log(data);
        
        try {
<<<<<<< Updated upstream

            await axios.post('https://back.museappofficial.com/album', data, {

                headers: {
                    "Content-Type": 'multipart/form-data',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImJsb2NrZWQiOmZhbHNlLCJpYXQiOjE3Mjc2MTg1MzR9.SgjsVIx5B0EmWYqIA9VRBtMKftaewtypEUfh9T5jcJA'
                }
            });
=======
            await axios.post('http://10.10.50.154:3000/album', data, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyNzM1MjkyN30.Z174f2qBn0P4m9606SJMDQuvBYMxuDKbeMNi6YMsgoo'
                }
            });
           
>>>>>>> Stashed changes
            props.refreshArtists();
            props.onClose();
        } catch (error) {
            alert('Could not upload album!');
        }
<<<<<<< Updated upstream
    };

=======
        console.log(data, "data")
    };

    

>>>>>>> Stashed changes
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <span className={styles.title}>{props.title}</span>
<<<<<<< Updated upstream
                <CloseButton onClick={props.onClose} bg={true} onClose={props.onClose} />
=======
                <CloseButton onClick={props.onClose} bg={true} />
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                            {errors.title && <span className={styles.error}>title is required</span>}
=======
                            {errors.title && <span className={styles.error}>Title is required</span>}
>>>>>>> Stashed changes
                        </div>

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
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewAlbumModal;
