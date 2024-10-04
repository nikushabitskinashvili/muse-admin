"use client";
import SearchInput from "./SearchInput/SearchInput";
import styles from "./Header.module.scss";
import Image from "next/image";
import { IconEnum } from "@/app/utlis/icons/icons";
import { handleLogout } from "@/app/scripts/Logout";
import {useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const logOut = () => {
    handleLogout();
    router.refresh();
  };
  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <div className={styles.container}>
          <Image
            src={"/Images/logo.png"}
            alt="logo"
            width={112}
            height={44}
          ></Image>
        </div>

        <div onClick={logOut} className={styles.logOut}>
          <Image src={'/icons/logOut.svg'} alt={""} width={32} height={32} />
        </div>
      </div>
    </main>
  );
};

export default Header;
