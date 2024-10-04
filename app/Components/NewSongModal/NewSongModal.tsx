import { Props, songModal } from '@/app/interface/props.interface'; 
import { Button } from '../Buttons/Buttons';
import CloseButton from '../CloseButton/CloseButton';
import { useForm } from 'react-hook-form';
import React, { useState } from "react";
import styles from './NewSongModal.module.scss';
import Image from 'next/image';
import { IconEnum } from '@/app/utlis/icons/icons';
import BaseApi from '@/app/api/baseApi';

interface NewSongModalProps extends Props {
    refreshSongs: () => void;
    albumId: number | null;
    artistId: number | null;
}

const NewSongModal = (props: NewSongModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<songModal>();

    const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(null);

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedCoverImage(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (values: songModal) => {
        const data = new FormData();
        data.append("name", values.name);
        data.append("music", values.music[0]);
        data.append("albumId", String(props.albumId));
        data.append('artistId', String(props.artistId));

        reset();
        setSelectedCoverImage(null);
        try {
            await BaseApi.post('/music', data);
            props.refreshSongs();
            if(props.onClose) props.onClose();
        } catch (error) {
            alert('Could not upload song!');
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
                    <label htmlFor="music" className={styles.img}>
                        <Image
                            src={selectedCoverImage || IconEnum.SONGUPLOAD}
                            alt="music"
                            width={161}
                            height={162}
                            style={{ cursor: 'pointer' }}
                        />
                        <input
                            className={styles.fileInput}
                            type="file"
                            id="music"
                            {...register('music', {
                                required: true,
                                onChange: handleCoverImageChange
                            })}
                        />
                    </label>
                    <div className={styles.inputsWrapper}>
                        <div className={styles.inp}>
                            <h2 className={styles.text}>Song Title</h2>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Song Title"
                                {...register('name', { required: true })}
                            />
                            {errors.name && <span className={styles.error}>Title is required</span>}
                        </div>
                        <Button bg={'pink'} title={"Add Song"} size={'huge'} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewSongModal;
