"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Table } from "antd";
import BlockAccount from "@/app/Components/BlockAccount/BlockAccount"; 
import EditPasswordModal from "@/app/Components/EditPasswordModal/EditPasswordModal";
import styles from "./Users.module.scss";
import { Props, User } from "@/app/interface/props.interface";
import Link from 'next/link';
import BaseApi from "@/app/api/baseApi";

const Users = (props: Props) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isBlockAccountModalOpen, setIsBlockAccountModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await BaseApi.get('/user');
                setUsers(response.data);
            } catch (error) {
                alert('Could not fetch users!');
            }
        };

        fetchUsers();
    }, []);


    const openChangePasswordModal = (user: User) => {
        setSelectedUser(user);
        setIsChangePasswordModalOpen(true);
    };

    const openBlockAccountModal = (user: User) => {
        setSelectedUser(user);
        setIsBlockAccountModalOpen(true);
    };

    const clickOnPop = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const closeModal = () => {
        setIsChangePasswordModalOpen(false);
        setIsBlockAccountModalOpen(false);
    };

    const columns = [
        {
            title: "Users",
            dataIndex: "email",
            key: "users",
            render: (text: string, record: User) => (
                <Link href={`/playlists/${record.id}`}>{text}</Link>
            ),
        },
        {
            title: "Edit",
            dataIndex: "edit",
            key: "edit",
            render: (_: any, record: User) => (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Image
                        style={{ borderRadius: "4px", background: "#747474", cursor: "pointer" }}
                        src="/icons/edit.svg"
                        alt="edit Icon"
                        width={24}
                        height={24}
                        onClick={() => openChangePasswordModal(record)}
                    />
                    <Image
                        style={{ borderRadius: "4px", background: "#E82567", cursor: "pointer" }}
                        src="/icons/block.svg"
                        alt="block Icon"
                        width={24}
                        height={24}
                        onClick={() => openBlockAccountModal(record)}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className={styles.table}>
                <div className={styles.tableWrapper}>
                    <Table dataSource={users} columns={columns} pagination={false} rowKey="id" />
                </div>
            </div>

            {isChangePasswordModalOpen && selectedUser && (
                <div className={styles.popBackground} onClick={closeModal}>
                    <div onClick={clickOnPop} className={styles.popContainer}>
                        <EditPasswordModal title="Edit Password" onClose={closeModal} />
                    </div>
                </div>
            )}

            {isBlockAccountModalOpen && selectedUser && (
                <div className={styles.popBackground} onClick={closeModal}>
                    <div onClick={clickOnPop} className={styles.popContainer}>
                        <BlockAccount
                            onClose={closeModal}
                            id={selectedUser.id}
                            email={selectedUser.email}
                            role={selectedUser.role}
                            blocked={selectedUser.blocked}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Users;
