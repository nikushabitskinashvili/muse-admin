"use client";
import SearchInput from "./SearchInput/SearchInput";
import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { IconEnum } from "@/app/utlis/icons/icons";
import { handleLogout } from "@/app/scripts/Logout";
import { redirect, useRouter } from "next/navigation";

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
          <SearchInput />
        </div>

        <div onClick={logOut} className={styles.logOut}>
          <Image src={IconEnum.LOGOUT} alt={""} width={32} height={32} />
        </div>
      </div>
    </main>
  );
};

export default Header;
