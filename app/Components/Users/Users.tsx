"use client"
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Table } from "antd";
import BlockAccount from "@/app/Components/BlockAccount/BlockAccount"; 
import EditPasswordModal from "@/app/Components/EditPasswordModal/EditPasswordModal";
import styles from "./Users.module.scss";
import { Props } from "@/app/interface/props.interface";
import Link from 'next/link';
import axios from 'axios';

interface User {
    id: string;
    email: string;
    role: string;
    blocked: boolean; 
}

const Users = (props: Props) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isBlockAccountModalOpen, setIsBlockAccountModalOpen] = useState(false); 
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [addPop, setAddPop] = useState(false);
    const addPopRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://back.museappofficial.com/user', {
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyNzM1MjkyN30.Z174f2qBn0P4m9606SJMDQuvBYMxuDKbeMNi6YMsgoo', 
                    },
                });
                setUsers(response.data); 
            } catch (error) {
                alert('Could not fetch users!');
            }
        };

        fetchUsers();
    }, []);

    const openChangePasswordModal = (user: string) => {
        setSelectedUser(user);
        setIsChangePasswordModalOpen(true);
    };

    const openBlockAccountModal = (user: string) => {
        setSelectedUser(user);
        setIsBlockAccountModalOpen(true); 
    };

    const toggleAddPop = () => {
        setAddPop(!addPop);
    };

    const clickOnPop = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const closeAddPop = () => {
        setAddPop(false);
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
                        onClick={() => openChangePasswordModal(record.email)} 
                    />
                    <Image
                        style={{ borderRadius: "4px", background: "#E82567", cursor: "pointer" }}
                        src="/icons/block.svg"
                        alt="block Icon"
                        width={24}
                        height={24}
                        onClick={() => openBlockAccountModal(record.email)} 
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

            {isChangePasswordModalOpen && (
                <div className={styles.popBackground} onClick={closeAddPop}>
                    <div ref={addPopRef} onClick={clickOnPop} className={styles.popContainer}>
                        <EditPasswordModal title="Edit Password" onClose={closeAddPop} />
                    </div>
                </div>
            )}

            {isBlockAccountModalOpen && (
                <div className={styles.popBackground} onClick={closeAddPop}>
                    <div ref={addPopRef} onClick={clickOnPop} className={styles.popContainer}>
                        <BlockAccount onClose={closeAddPop} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Users;
