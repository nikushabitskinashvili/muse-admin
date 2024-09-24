"use client";
import { Props } from "@/app/interface/props.interface"; // Make sure Props has onClose
import { Button } from "../Buttons/Buttons";
import CloseButton from "../CloseButton/CloseButton";
import styles from "./EditPasswordModal.module.scss";
import { useState } from "react";
import axios from "axios";

const EditPasswordModal = (onClick: Props) => {
    const [newPassword, setNewPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("https://back.museappofficial.com/update-password", {
                password: newPassword,
            });

            console.log("Password updated:", response.data);
        } catch (err) {
            console.error("Error updating password:", err);
            setError("Failed to update password. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <span className={styles.title}>{onClick.title}</span>
                <CloseButton onClick={onClick.onClose} bg={true} />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputCont}>
                    <h2 className={styles.text}>New Password</h2>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <Button bg="pink" title="Edit Password" size="huge" />
            </form>
        </div>
    );
};

export default EditPasswordModal;
