"use client";
import styles from './NewArtistModal.module.scss';
import React, { useState } from "react";
import { Button } from '../Buttons/Buttons';
import CloseButton from '../CloseButton/CloseButton';
import { useForm } from 'react-hook-form';
import { Modal, Props } from '@/app/interface/props.interface';
import { IconEnum } from '@/app/utlis/icons/icons';
import Image from 'next/image';
import BaseApi from '@/app/api/baseApi';

interface NewArtistModalProps extends Props {
    refreshArtists: () => void;
}

const NewArtistModal = (props: NewArtistModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Modal>();

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

    const onSubmit = async (values: Modal) => {
        const data = new FormData();
        data.append("name", values.name);
        data.append("biography", values.biography);
        data.append("cover", values.cover[0]);
        data.append("image", values.image[0]);

        reset();
        setSelectedArtistImage(null);
        setSelectedCoverImage(null);
        try {
            await BaseApi.post('/artist', data);
            props.refreshArtists();
            if(props.onClose) props.onClose()
        } catch (error) {
            alert('Could not upload artist!');
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
                        <label className={styles.img} htmlFor='image'>
                            <Image
                                src={selectedArtistImage || IconEnum.FILEUPLOAD}
                                alt="image"
                                width={227}
                                height={180}
                                style={{ cursor: 'pointer' }}
                            />
                            <input
                                className={styles.fileInput}
                                type="file"
                                id="image"
                                {...register('cover', {
                                    required: true,
                                    onChange: handleArtistImageChange
                                })}
                            />
                        </label>
                        <label htmlFor="cover" className={styles.img}>
                            <Image
                                src={selectedCoverImage || IconEnum.COVER}
                                alt="cover"
                                width={454}
                                height={170}
                                style={{ cursor: 'pointer' }}
                            />
                            <input
                                className={styles.fileInput}
                                type="file"
                                id="cover"
                                {...register('image', {
                                    required: true,
                                    onChange: handleCoverImageChange
                                })}
                            />
                        </label>
                    </div>
                    <div className={styles.inputsWrapper}>
                        <div className={styles.inp}>
                            <h2 className={styles.text}>Name</h2>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Artist Name"
                                {...register('name', { required: true })}
                            />
                            {errors.name && <span className={styles.error}>Name is required</span>}
                        </div>

                        <div className={styles.inp}>
                            <h2 className={styles.text}>Biography</h2>
                            <textarea
                                className={styles.textarea}
                                placeholder="Artist Biography"
                                {...register('biography', {
                                    required: true,
                                })}
                            />
                        </div>
                        <Button bg={'pink'} title={"Add Artist"} size={'huge'} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewArtistModal;
