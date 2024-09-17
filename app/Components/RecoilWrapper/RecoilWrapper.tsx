'use client'

import React, { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

import { usePathname } from 'next/navigation';



const RecoilWrapper = (props: { children: ReactNode }) => {

    let pathName = usePathname();

    return (
        <RecoilRoot>
            {props.children}
        </RecoilRoot>
    )
}

export default RecoilWrapper
