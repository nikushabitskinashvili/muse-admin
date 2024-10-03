"use client";
import { Props } from "@/app/interface/props.interface";
import { Button } from "../Buttons/Buttons";
import CloseButton from "../CloseButton/CloseButton";
import styles from "./EditPasswordModal.module.scss";
import { useState } from "react";
import BaseApi from "@/app/api/baseApi";
import { log } from "console";

const EditPasswordModal = ({ title, onClose, id }: Props) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [addPop, setAddPop] = useState(false);

  const closeAddPop = () => {
    setAddPop(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await BaseApi.patch(`/user/${id}`, {
        password: newPassword,
      });
      console.log(response);
    } catch (err) {
      alert("Failed to update password. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <span className={styles.title}>{title}</span>
        <CloseButton onClick={onClose} bg={true} onClose={closeAddPop} />
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
