"use client"
import styles from "./Buttons.module.scss";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IconEnum } from '@/app/utlis/icons/icons';

interface Props {
    bg: string
    title: string
    type?: "submit" | "button"
    size?: 'normal' | 'big' | 'huge'
    icon?: keyof typeof IconEnum;
    hoverIcon?: keyof typeof IconEnum;
    activeIcon?: keyof typeof IconEnum;
    onClick?: () => void;
    onClickSecond?: (value: boolean) => void;
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
    else classes.push(styles.none)
    const showTitle = () => {
        return !(props.title == '' && isSmallScreen)
    }


    return (
        <button
            type={props.type}
            className={classes.join(' ')}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={props.onClick}
        >
            {showTitle() && <span className={styles.title}>{props.title}</span>}
            {currentIcon && <Image className={styles.icon} src={IconEnum[currentIcon]} alt={''} width={24} height={24} />}</button>
    )
}