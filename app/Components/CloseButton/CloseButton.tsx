import styles from "./CloseButton.module.scss";
import Image from "next/image";
import { IconEnum } from "@/app/utlis/icons/icons";
import { Props } from "@/app/interface/props.interface";



const CloseButton = (props: Props) => {
    const classes = [styles.x];

    if (!props.bg) classes.push(styles.bgNone);

    return (
        <button className={classes.join('')} onClick={props.onClick}><Image alt={''} src={IconEnum.CLOSE} width={24} height={24} /></button>
    )
}

export default CloseButton;

