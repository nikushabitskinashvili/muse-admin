"use client";

import { usePathname } from "next/navigation";
import styles from "./Aside.module.scss";
import AsideItem from "./AsideItem/AsideItem";
import { IconEnum } from "@/app/utlis/icons/icons";

const Aside = () => {
    const Asidelinks = [
        { title: "Users", pathname: "/", key: "/", src: IconEnum.USER, hoverSrc: IconEnum.BLUEUSER, activeSrc: IconEnum.BLUEUSER },
        { title: "Artists", pathname: "/artists", key: "/artists", src: IconEnum.ARTIST, hoverSrc: IconEnum.BLUEARTIST, activeSrc: IconEnum.BLUEARTIST},
    ];


    const pathName = usePathname();
    console.log(pathName);
    
    return (
        <div className={styles.aside}>
            <div className={styles.asideWrapper}>
                <ul className={styles.items}>
                    {Asidelinks.map((link, idx) => (
                        <AsideItem
                            key={idx}
                            active={pathName === link.key}
                            pathname={link.pathname}
                            title={link.title}
                            src={link.src}
                            hoverSrc={link.hoverSrc}
                            activeSrc={link.activeSrc}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Aside;
