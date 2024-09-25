"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Table } from "antd";
import BlockAccount from "@/app/Components/BlockAccount/BlockAccount"; 
import EditPasswordModal from "@/app/Components/EditPasswordModal/EditPasswordModal";
import styles from "./Users.module.scss";
import { Props } from "@/app/interface/props.interface";
import Link from 'next/link';

const Users = (props: Props) => {
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isBlockAccountModalOpen, setIsBlockAccountModalOpen] = useState(false); 
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [addPop, setAddPop] = useState(false);
    const addPopRef = useRef<HTMLDivElement>(null);

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

    const dataSource = [
        {
            key: "1",
            title: "bitskinashvili.nika16@gmail.com",
            password: "sjajannzkaiausj",
            edit: "10 Downing Street",
        },
        {
            key: "2",
            title: "chitishvili.gabrieli@gmail.com",
            password: "sjajjshjanjsi",
            edit: "10 Downing Street",
        },
        {
            key: "3",
            title: "boka.kajilashvili@gmail.com",
            password: "nikssjsjnajajaj",
            edit: "10 Downing Street",
        },
        {
            key: "4",
            title: "boka.kajilashvili@gmail.com",
            password: "nikssjsjnajajaj",
            edit: "10 Downing Street",
        },
        {
            key: "5",
            title: "boka.kajilashvili@gmail.com",
            password: "nikssjsjnajajaj",
            edit: "10 Downing Street",
        },
        {
            key: "6",
            title: "boka.kajilashvili@gmail.com",
            password: "nikssjsjnajajaj",
            edit: "10 Downing Street",
        },
        {
            key: "7",
            title: "boka.kajilashvili@gmail.com",
            password: "nikssjsjnajajaj",
            edit: "10 Downing Street",
        },
        {
            key: "8",
            title: "boka.kajilashvili@gmail.com",
            password: "nikssjsjnajajaj",
            edit: "10 Downing Street",
        },
        {
            key: "9",
            title: "boka.kajilashvili@gmail.com",
            password: "nikssjsjnajajaj",
            edit: "10 Downing Street",
        },
        {
            key: "10",
            title: "boka.kajilashvili@gmail.com",
            password: "nikssjsjnajajaj",
            edit: "10 Downing Street",
        },{
            key: "11",
            title: "boka.kajilashvili@gmail.com",
            password: "nikssjsjnajajaj",
            edit: "10 Downing Street",
        },

        
    ];

    const columns = [
        {
            title: "Users",
            dataIndex: "title",
            key: "users",
            render: (text: string, record: any) => (
                <Link href={'/playlists/'}>{text}</Link> 
            ),
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
            render: (_: any, record: any) => (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Image
                        style={{ borderRadius: "4px", background: "#747474", cursor: "pointer" }}
                        src="/icons/edit.svg"
                        alt="edit Icon"
                        width={24}
                        height={24}
                        onClick={() => openChangePasswordModal(record.title)}
                    />

                    <Image
                        style={{ borderRadius: "4px", background: "#E82567", cursor: "pointer" }}
                        src="/icons/block.svg"
                        alt="block Icon"
                        width={24}
                        height={24}
                        onClick={() => openBlockAccountModal(record.title)} 
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className={styles.table}>
                <div className={styles.tableWrapper}>
                    <Table dataSource={dataSource} columns={columns} pagination={false} />
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
                        <BlockAccount /> 
                    </div>
                </div>
            )}
        </>
    );
};

export default Users;
