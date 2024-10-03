"use client";

import { SetStateAction, useState } from "react";
import styles from "./loginPage.module.scss";
import AuthButton from "@/app/Components/AuthButton/AuthButton";
import AuthInput from "@/app/Components/AuthInput/AuthInput";
import AuthTitle from "@/app/Components/AuthTitle/AuthTItle";
import { handleLogin } from "@/app/scripts/Login";

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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const result = await handleLogin(emailOrUsername, password);

    if (result.success) {
      window.location.reload();
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general:
          result.errorMessage || "An error occurred. Please try again later.",
      }));
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
