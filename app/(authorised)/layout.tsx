import React, { ReactNode } from "react";
import './layout.module.css';
import Header from "../Components/Header/Header";
import Aside from "../Components/Aside/Aside";
import RecoilWrapper from "../Components/RecoilWrapper/RecoilWrapper";
import styles from "./layout.module.css";
import AlbumCard from "../Components/AlbumCard/AlbumCard";

type Props = {
    children: ReactNode;
}

const AuthLayout = (props: Props) => {
    return (
        <>

            <Header />
            <RecoilWrapper>
                <div className={styles.container}>
                    <Aside />
                    {props.children}
                </div>    
            </RecoilWrapper>

        </>

    )
}

export default AuthLayout;