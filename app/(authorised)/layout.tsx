import React, { ReactNode } from "react";
import './layout.module.css';
import Header from "../Components/Header/Header";
import Aside from "../Components/Aside/Aside";

type Props = {
    children: ReactNode;
}

const AuthLayout = (props: Props) => {
    return (
        <>
            <Header/>
            <Aside/>
            
        </>

    )
}

export default AuthLayout;