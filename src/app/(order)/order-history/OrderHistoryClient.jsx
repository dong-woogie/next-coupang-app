"use client";
import Heading from "@/components/heading/Heading";
import Loader from "@/components/loader/Loader";
import useFetchDocuments from "@/hooks/useFetchDocuments";
import { selectUserID } from "@/redux/slice/authSlice";
import React from "react";
import priceFormat from "@/utils/priceFormat";
import { useSelector } from "react-redux";
import { formatTime } from "@/utils/dayjs";
import styles from "./OrderHistoryClient.module.scss";
import { useRouter } from "next/navigation";

const OrderHistoryClient = () => {
  const userID = useSelector(selectUserID);
  const { documents: orders, isLoading } = useFetchDocuments("orders", [
    "userID",
    "==",
    userID,
  ]);
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/order-details/${id}`);
  };

  return (
    <section className={styles.order}>
      <Heading title="주문 목록" />
      {isLoading && <Loader />}
      <div className={styles.table}>
        {orders.length === 0 ? (
          <p>주문 목록이 없습니다.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>순서</th>
                <th>주문 날짜</th>
                <th>주문 아이디</th>
                <th>주문 금액</th>
                <th>주문 상태</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const { id, orderDate, orderTime, orderAmount, orderStatus } =
                  order;

                return (
                  <tr key={id} onClick={() => handleClick(id)}>
                    <td>{index + 1}</td>
                    <td>{formatTime(orderDate)}</td>
                    <td>{id}</td>
                    <td>{priceFormat(orderAmount)}원</td>
                    <td>
                      <p
                        className={
                          orderStatus !== "배송완료"
                            ? `${styles.pending}`
                            : `${styles.delivered}`
                        }
                      >
                        {orderStatus}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default OrderHistoryClient;
