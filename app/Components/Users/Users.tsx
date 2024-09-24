"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Table } from "antd";
import EditPasswordModal from "@/app/Components/EditPasswordModal/EditPasswordModal";
import styles from "./Users.module.scss";
import { Props } from "@/app/interface/props.interface";

const Users = (props: Props) => {
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [addPop, setAddPop] = useState(false);
    const addPopRef = useRef<HTMLDivElement>(null);

    const openChangePasswordModal = (user: string) => {
        setSelectedUser(user);
        setIsChangePasswordModalOpen(true);
    };

    const toggleAddPop = () => {
        setAddPop(!addPop);
    };

    const clickOnPop = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const closeAddPop = () => {
        setAddPop(false);
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
            render: (_: any, record: any) => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                    }}
                >
                    <Image
                        style={{
                            borderRadius: "4px",
                            background: "#747474",
                            cursor: "pointer",
                        }}
                        src="/icons/edit.svg"
                        alt="edit Icon"
                        width={24}
                        height={24}
                        onClick={() => openChangePasswordModal(record.title)}
                    />

                    <Image
                        style={{
                            borderRadius: "4px",
                            background: "#E82567",
                            cursor: "pointer",
                        }}
                        src="/icons/block.svg"
                        alt="block Icon"
                        width={24}
                        height={24}
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
                    <div
                        ref={addPopRef}
                        onClick={clickOnPop}
                        className={styles.popContainer}
                    >
                        <EditPasswordModal
                            title="Edit Password"
                            onClose={closeAddPop}
                        />
                    </div>
                </div>
            )}

        </>
    );
};

export default Users;
