import Link from 'next/link';
import { useState } from 'react'; 
import styles from './AsideItem.module.scss';
import Image from 'next/image';


type Props = {
    active: boolean;
    pathname: string;
    title: string;
    src: string;
    hoverSrc?: string; 
    activeSrc?: string; 
};

const AsideItem = (props: Props) => {
    const [isHovered, setIsHovered] = useState(false); 

    const getImageSrc = () => {
        if (props.active) return props.activeSrc || props.src;
        if (isHovered) return props.hoverSrc || props.src;
        return props.src;
    };

    return (
        <li
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={props.pathname}
                className={`${styles.defaultLink} ${props.active ? styles.active : ''}`}>
                <Image
                    src={getImageSrc()}
                    alt={props.title}
                    width={32}
                    height={32}
                    className={styles.img}
                />
                {props.title}
            </Link>
        </li>
    );
};

export default AsideItem;
