import { User } from "@/app/interface/props.interface";
import { Button } from "../Buttons/Buttons";
import styles from "./BlockAccount.module.scss";
import { useState } from "react";
import BaseApi from "@/app/api/baseApi";

const BlockAccount = (props: User) => {
  const [isBanned, setIsBanned] = useState(props.blocked);

  const handleBlockUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newBlockState = !isBanned;
    const apiEndpoint = newBlockState
      ? `/user/block/${props.id}`
      : `/user/unblock/${props.id}`;

    try {
      const response = await BaseApi.patch(apiEndpoint);

      if (response.status === 200) {
        setIsBanned(newBlockState);
        if (props.refreshUsers) props.refreshUsers();
        if (props.onClose) props.onClose();
      }
    } catch (error) {
      alert(`Could not ${newBlockState ? "ban" : "unban"} user!`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.texts}>
          <h2 className={styles.text}>
            {isBanned ? "Unblock this account?" : "Block this account?"}
          </h2>
          <p>
            Are you sure you want to {isBanned ? "unblock" : "block"} this
            account?
          </p>
        </div>
        <div className={styles.buttons}>
          <Button
            bg={""}
            title={"Cancel"}
            size={"normal"}
            onClick={props.onClose}
          />
          <Button
            bg={"pink"}
            title={isBanned ? "Unblock" : "Block"}
            size={"normal"}
            onClick={handleBlockUser}
          />
        </div>
      </div>
    </div>
  );
};

export default BlockAccount;
