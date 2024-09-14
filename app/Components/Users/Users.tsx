"use client";
import Image from "next/image";
import { Table } from "antd";
import styles from "./Users.module.scss";

export const Users = () => {



    const dataSource = [
        {
            key: "1",
            title: "eere",
            password: "fdsswwedfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "2",
            title: "eere",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "3",
            title: "eere",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "4",
            title: "eere",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "5",
            title: "eere",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "6",
            title: "eere",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "7",
            title: "eere",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "8",
            title: "eere",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "9",
            title: "eere",
            password: "fdssdfshdsh",
            edit: "10 Downing Street",
        },
        {
            key: "10",
            title: "eere",
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
            )},
        ]

    return (
        <div className={styles.table}>
            <div className={styles.tableWrapper}>
                <Table dataSource={dataSource} columns={columns} pagination={false}  />
            </div>
        </div>

    );
};

export default Users;
