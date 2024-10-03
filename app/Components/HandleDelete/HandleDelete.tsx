import { FC } from 'react';
import Image from 'next/image';
import { IconEnum } from '@/app/utlis/icons/icons';
import BaseApi from '@/app/api/baseApi';

interface DeleteButtonProps {
    id: number;
    onDelete: (id: number) => void;
}

const HandleDelete: FC<DeleteButtonProps> = ({ id, onDelete }) => {
    const handleDelete = async () => {
        try {
            await BaseApi.delete(`artist/${id}`);
            onDelete(id);
        } catch (error) {
        }
    };

    return (
        <Image src={IconEnum.BIN} alt='bin' width={24} height={24} onClick={handleDelete}/>
    )
};

export default HandleDelete;