"use client";
import React from "react";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_CART,
  DECREASE_CART,
  INCREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "@/redux/slice/cartSlice";
import { useRouter } from "next/navigation";
import { selectIsLoggedIn } from "@/redux/slice/authSlice";
import Heading from "@/components/heading/Heading";
import Link from "next/link";
import Image from "next/image";
import priceFormat from "@/utils/priceFormat";
import { FaTrashAlt } from "react-icons/fa";
import Button from "@/components/button/Button";

const CartClient = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const increaseCart = (id) => {
    dispatch(INCREASE_CART({ id }));
  };
  const decreaseCart = (id) => {
    dispatch(DECREASE_CART({ id }));
  };
  const removeFromCart = (id) => {
    dispatch(REMOVE_FROM_CART({ id }));
  };
  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  const checkout = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (isLoggedIn) {
      router.push("/checkout-address");
      dispatch(SAVE_URL(url));
    } else {
      router.push("/login");
    }
  };

  return (
    <section className={styles.table}>
      <Heading title="장바구니" />
      {cartItems.length === 0 ? (
        <>
          <p className={styles.emptyText}>장바구니가 비었습니다.</p>
          <div className={styles.emptyText}>
            <Link href="/">계속 쇼핑하기</Link>
          </div>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>순서</th>
                <th>상품</th>
                <th>가격</th>
                <th>개수</th>
                <th>합계</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cart, index) => {
                const { id, name, price, imageURL, cartQuantity } = cart;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <Image
                        src={imageURL}
                        alt={name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td>{priceFormat(price)}원</td>
                    <td>
                      <div className={styles.count}>
                        <button onClick={() => decreaseCart(cart.id)}>-</button>

                        <p>
                          <b>{cartQuantity}</b>
                        </p>

                        <button onClick={() => increaseCart(cart.id)}>+</button>
                      </div>
                    </td>
                    <td>{priceFormat(price * cartQuantity)}원</td>
                    <td className={styles.icons}>
                      <FaTrashAlt
                        size={19}
                        color="red"
                        onClick={() => removeFromCart(cart.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.summary}>
            <Button onClick={clearCart}>카트 비우기</Button>
            <div className={styles.checkout}>
              <div className={styles.text}>
                <h4>총 상품 개수</h4>
                <p>{cartTotalQuantity}개</p>
              </div>
              <div className={styles.text}>
                <h4>합계</h4>
                <p>{priceFormat(cartTotalAmount)}원</p>
              </div>
              <Button onClick={checkout}>계산하기</Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartClient;
