"use client";
import React, { useState } from "react";
import styles from "./CheckoutAddressClient.module.scss";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "@/redux/slice/checkoutSlice";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";

const initialAddressState = {
  name: "",
  line: "",
  city: "",
  postcode: "",
};

const CheckoutAddressClient = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const handleShipping = (e) => {
    const { name, value } = e.target;

    setShippingAddress((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;

    setBillingAddress((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS({ ...shippingAddress }));
    dispatch(SAVE_BILLING_ADDRESS({ ...billingAddress }));
    router.push("/checkout");
  };

  return (
    <section className={styles.checkout}>
      <Heading title={"상세 주문"} />
      <form onSubmit={handleSubmit}>
        <div className={styles.card}>
          <h3>배송 주소</h3>
          <label>받는 사람 이름</label>
          <input
            type="text"
            placeholder="받는 사람 이름"
            required
            name="name"
            value={shippingAddress.name}
            onChange={handleShipping}
          />

          <label>상세주소</label>
          <input
            type="text"
            placeholder="상세주소"
            required
            name="line"
            value={shippingAddress.line}
            onChange={handleShipping}
          />

          <label>도시</label>
          <input
            type="text"
            placeholder="도시"
            required
            name="city"
            value={shippingAddress.city}
            onChange={handleShipping}
          />

          <label>우편번호</label>
          <input
            type="text"
            placeholder="우편번호"
            required
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleShipping}
          />
        </div>

        <div className={styles.card}>
          <h3>청구지 주소</h3>
          <label>보내는 사람 이름</label>
          <input
            type="text"
            placeholder="보내는 사람 이름"
            required
            name="name"
            value={billingAddress.name}
            onChange={handleBilling}
          />

          <label>상세주소</label>
          <input
            type="text"
            placeholder="상세주소"
            required
            name="line"
            value={billingAddress.line}
            onChange={handleBilling}
          />

          <label>도시</label>
          <input
            type="text"
            placeholder="도시"
            required
            name="city"
            value={billingAddress.city}
            onChange={handleBilling}
          />

          <label>우편번호</label>
          <input
            type="text"
            placeholder="우편번호"
            required
            name="postalCode"
            value={billingAddress.postalCode}
            onChange={handleBilling}
          />
          <Button type="submit">주문하기</Button>
        </div>
      </form>
    </section>
  );
};

export default CheckoutAddressClient;
