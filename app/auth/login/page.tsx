"use client";

import { SetStateAction, useState } from "react";
import styles from "./loginPage.module.scss";
import { fakeUsers } from "@/app/data/userData";
import Link from "next/link";
import AuthButton from "@/app/Components/AuthButton/AuthButton";
import AuthInput from "@/app/Components/AuthInput/AuthInput";
import AuthTitle from "@/app/Components/AuthTitle/AuthTItle";

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleEmailOrUsernameChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmailOrUsername(e.target.value);
    setErrors({ ...errors, emailOrUsername: "" });
  };

  const handlePasswordChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: "" });
  };

  const validateForm = () => {
    let valid = true;
    let errors = { emailOrUsername: "", password: "" };

    if (emailOrUsername.trim() === "") {
      errors.emailOrUsername = "Email or username cannot be empty";
      valid = false;
    }

    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    const user = fakeUsers.find(
      (user) => user.email === emailOrUsername && user.password === password
    );

    if (!user) {
      const userWithEmail = fakeUsers.find(
        (user) => user.email === emailOrUsername
      );

      if (userWithEmail) {
        errors.password = "Incorrect password.";
      } else {
        errors.emailOrUsername = "User does not exist. Please check your email";
      }

      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Email", emailOrUsername);
      console.log("Password:", password);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      
      <div className={styles.rightBlock}>
        <AuthTitle title="Log in" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputDiv}>
            <AuthInput
              placeholder="Enter email or user name"
              type="text"
              value={emailOrUsername}
              onChange={handleEmailOrUsernameChange}
            />
            {errors.emailOrUsername !== "" && (
              <p className={styles.error}>{errors.emailOrUsername}</p>
            )}
          </div>
          <div className={styles.inputDiv}>
            <AuthInput
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password !== "" && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>
          <AuthButton
            bgColor="#E82567"
            titleColor="#FFFFFF"
            buttonTitle="Log in"
            type="submit"
          />
        </form>
        
      </div>
    </div>
  );
}





