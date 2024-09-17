"use client"
import { useState } from 'react';
import Image from 'next/image';
import { Table } from 'antd';
import styles from './Users.module.scss';
import ReusableModal from '../ReusableModal/ReusableModal';

const Users = () => {
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

    const openChangePasswordModal = () => setIsChangePasswordModalOpen(true);
    const closeChangePasswordModal = () => setIsChangePasswordModalOpen(false);

    const handleChangePasswordSubmit = (formData: FormData) => {

        closeChangePasswordModal();
    };

    const dataSource = [
        {
            key: "1",
            title: "eewhdwdhdwjdwwhre",
            password: "fdsswwedfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "2",
            title: "eejeednfdejeejre",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "3",
            title: "eeejerjerefjrre",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "4",
            title: "eeruerejedjerre",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "5",
            title: "ererejefdnjere",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "6",
            title: "erfrejnfrmrere",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "7",
            title: "eerfjrfrjrfrjre",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "8",
            title: "eefjrfrnfrjrjre",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "9",
            title: "eefjfgnggjrrjrtjre",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "10",
            title: "edhfhfsjdsdjere",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
    ];

    const columns = [
        {
            title: "Users",
            dataIndex: "title",
            key: "users",
        },
        {
            title: "Password",
            dataIndex: "password",
            key: "password",
        },
        {
            title: "Edit",
            dataIndex: "edit",
            key: "edit",
            render: () => (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                }}>



                    <Image
                        style={{
                            borderRadius: "4px",
                            background: "#747474",
                            cursor: "pointer"
                        }}
                        src="/icons/edit.svg"
                        alt="edit Icon"
                        width={24}
                        height={24}
                        onClick={openChangePasswordModal}
                    />

                    <Image

                        style={{
                            borderRadius: "4px",
                            background: "#E82567",
                            cursor: "pointer"
                        }}
                        src="/icons/block.svg"
                        alt="block Icon"
                        width={24}
                        height={24}
                    />
                </div>
            )
        },
    ]


    return (
        <>
            <div className={styles.table}>
                <div className={styles.tableWrapper}>
                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                </div>
            </div>
            <ReusableModal
                isOpen={isChangePasswordModalOpen}
                onClose={closeChangePasswordModal}
                onSubmit={handleChangePasswordSubmit} 
                 buttonTitle={'Edit Password'}      >
                <input type="password" name="newPassword" placeholder="Enter new password" />
            </ReusableModal>
        </>
    );
};

export default Users;
