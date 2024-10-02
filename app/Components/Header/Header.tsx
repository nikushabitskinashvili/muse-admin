import SearchInput from "./SearchInput/SearchInput";
import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { IconEnum } from "@/app/utlis/icons/icons";
import BaseApi from "@/app/api/baseApi";
import { useState } from "react";
import { User } from "@/app/interface/props.interface";




const Header = () => {
    return (
        <main className={styles.main}>
            <div className={styles.mainWrapper}>
                <div className={styles.container}>
                    <Image src={"/Images/logo.png"} alt="logo" width={112} height={44}></Image>
                    <SearchInput />
                </div>

                <Link className={styles.logOut} href={'/auth/login'}><Image src={IconEnum.LOGOUT} alt={''} width={32}
                    height={32} /></Link>

            </div>

        </main>
    )
}

export default Header;


