"use client";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import InnerHeader from "../innerHeader/InnerHeader";
import { useDispatch } from "react-redux";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "@/redux/slice/authSlice";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [displayName, setDisplayName] = useState("");
  const dispatch = useDispatch();
  const disabledHeader =
    pathname === "/login" || pathname === "/login" || pathname === "/reset";

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("로그아웃 되었습니다.");
        router.push("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (disabledHeader) return;
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setDisplayName("");
        // 유저 정보를 리덕스 스토어에서 지우기
        dispatch(REMOVE_ACTIVE_USER());
        return;
      }
      let displayName;
      if (user.displayName) {
        displayName = user.displayName;
      }
      displayName = user.email.split("@")[0];

      setDisplayName(displayName);

      dispatch(
        SET_ACTIVE_USER({
          userName: displayName,
          email: user.email,
          userID: user.uid,
        })
      );

      // 유저 정보를 리덕스 스토어에 저장하기
    });
  }, [disabledHeader, dispatch]);

  if (disabledHeader) return null;

  return (
    <header>
      <div className={styles.loginBar}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href="/login">로그인</Link>
          </li>
          <li className={styles.item}>
            <Link href="/admin/dashboard">관리자</Link>
          </li>
          <li className={styles.item}>
            <Link href="/order-history">주문목록</Link>
          </li>
          <li className={styles.item}>
            <Link href="/" onClick={logoutUser}>
              로그아웃
            </Link>
          </li>

          <li className={styles.item}>
            <Link href="/">제휴 마케팅</Link>
          </li>
          <li className={styles.item}>
            <Link href="/">쿠팡 플레이</Link>
          </li>
          <li className={styles.item}>
            <Link href="/">로그아웃</Link>
          </li>
        </ul>
      </div>

      {pathname.startsWith("/admin") ? null : <InnerHeader />}
    </header>
  );
};

export default Header;
