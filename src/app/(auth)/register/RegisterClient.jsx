"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../login/Auth.module.scss";
import LogoPath from "@/assets/colorful.svg";
import Image from "next/image";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import Divider from "@/components/divider/Divider";
import Link from "next/link";
import Loader from "@/components/loader/Loader";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const RegisterClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const redirectUser = () => {
    router.push("/");
  };

  const registerUser = (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      toast.error("비밀번호가 일치하지 않습니다.");

      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);

        toast.success("등록 성공...");
        router.push("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });

    setIsLoading(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image src={LogoPath} alt="logo" priority onClick={redirectUser} />
          </h1>

          <form onSubmit={registerUser} className={styles.form}>
            {/* Input */}
            <Input
              email
              icon="letter"
              id="email"
              name="email"
              label="email"
              placeholder="아이디(이메일)"
              className={styles.control}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Input */}
            <Input
              password
              icon="lock"
              id="password"
              name="password"
              label="비밀번호"
              placeholder="비밀번호"
              className={styles.control}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Input */}
            <Input
              password
              icon="lock"
              id="cPassword"
              name="cPassword"
              label="비밀번호"
              placeholder="비밀번호 확인"
              className={styles.control}
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />

            <div className="buttonGroup">
              <Button width={"100%"} type="submit">
                회원가입
              </Button>
              <Divider />
              <Link href="/login">
                <Button width={"100%"} secondary>
                  로그인
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterClient;
