"use server"

import { cookies } from "next/headers";
import { AUTH_COOKIE_KEY } from "../constant";


export const handleLogout =  () => {
     const cookieStore = cookies()
     cookieStore.delete(AUTH_COOKIE_KEY)
   };