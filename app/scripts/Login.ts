"use server";

import axios from "axios";
import { cookies } from "next/headers";
import BaseApi from "../api/baseApi";
import { AUTH_COOKIE_KEY } from "../constant";

export async function handleLogin(email: string, password: string) {
  try {
    const response = await BaseApi.post("/auth/login", {
      email,
      password,
    });
    
    if (response.status === 201) {
      const cookieStore = cookies();
      cookieStore.set(AUTH_COOKIE_KEY, response.data.access_token);
      // console.log(response.data)
      return { success: true };
    } else {
      return { success: false, errorMessage: "Failed to login" };
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      return { success: false, errorMessage: "Invalid email or password." };
    }
    return { success: false, errorMessage: "An error occurred. Please try again later." };
  }
}
