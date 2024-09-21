"use client";
import styles from './NewArtistModal.module.scss';
import React, { useState } from "react";
import { Button } from '../Buttons/Buttons';
import CloseButton from '../CloseButton/CloseButton';
import { useForm } from 'react-hook-form';
import { Modal, Props } from '@/app/interface/props.interface';
import axios from 'axios';
import { IconEnum } from '@/app/utlis/icons/icons';
import Image from 'next/image';

const NewArtistModal = (props: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Modal>();

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

   
    const onSubmit = async (values: Modal) => {
        const data = new FormData();
        data.append("name", values.name);
        data.append("biography", values.biography);
        data.append("image", values.image);
        data.append("cover", values.cover);

        try {
            const response = await axios.post('https://back.museappofficial.com/artist', data, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <span className={styles.title}>{props.title}</span>
                <CloseButton onClick={props.onClose} bg={true} />
            </div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputs}>
                    <label className={styles.img} htmlFor='image'>
                        <Image
                            src={selectedImage || IconEnum.FILEUPLOAD}
                            alt="cover"
                            width={470}
                            height={364}
                            style={{ cursor: 'pointer' }}
                        />
                        <input
                            className={styles.fileInput}
                            type="file"
                            id="image"
                            {...register('image')}
                            onChange={handleImageChange}
                        />
                    </label>

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
                                {...register('biography')}
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
