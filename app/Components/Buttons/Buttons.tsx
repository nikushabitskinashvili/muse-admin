"use client"
import styles from "./Buttons.module.scss";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IconEnum } from '@/app/utlis/icons/icons';

interface Props {
    bg: string
    title: string
    type?: string
    size?: 'normal' | 'big' | 'huge'
    icon?: keyof typeof IconEnum;
    hoverIcon?: keyof typeof IconEnum;
    activeIcon?: keyof typeof IconEnum;
    onClick?: () => void;
}

export const Button = (props: Props) => {

    const [currentIcon, setCurrentIcon] = useState(props.icon);
    const [isSmallScreen, setIsSmallScreen] = useState(false)


    const handleMouseOver = () => {
        setCurrentIcon(props.hoverIcon);
    }

    const handleMouseOut = () => {
        setCurrentIcon(props.icon);

    }

    const handleMouseDown = () => {
        setCurrentIcon(props.activeIcon);
    }

    const handleMouseUp = () => {
        setCurrentIcon(currentIcon);
    }


    const classes = [styles.container]


    if (props.size === 'huge') classes.push(styles.huge)
    else if (props.size === 'big') classes.push(styles.big)

    if (props.bg === 'blue') classes.push(styles.blue)
    else if (props.bg === 'pink') classes.push(styles.pink)


    return (
        <button
            className={classes.join(' ')}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {currentIcon && <Image className={styles.icon} src={IconEnum[currentIcon]} alt={''} width={24} height={24} />}</button>
    )
}