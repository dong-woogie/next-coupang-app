"use client";
import React, { useState } from "react";
import styles from "./ReviewProduct.module.scss";
import { useParams, useRouter } from "next/navigation";
import useFetchDocument from "@/hooks/useFetchDocument";
import Heading from "@/components/heading/Heading";
import Loader from "@/components/loader/Loader";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import Button from "@/components/button/Button";
import { useSelector } from "react-redux";
import { selectUserID, selectUserName } from "@/redux/slice/authSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { toast } from "react-toastify";

const ReviewProductClient = () => {
  const { id } = useParams();
  const { document: product } = useFetchDocument("products", id);
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");

  const router = useRouter();
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();

    const reviewData = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewData);
      router.push(`/product-details/${id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className={styles.review}>
      <Heading title="상품평 작성하기" />
      {product === null ? (
        <Loader basic />
      ) : (
        <div>
          <p>
            <b>상품 이름:</b>
            {product.name}
          </p>
          <Image
            src={product.imageURL}
            alt={product.name}
            width={100}
            height={100}
            priority
          />
        </div>
      )}

      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <label>평점: </label>
          <Rating
            initialValue={rate}
            onClick={(rate) => {
              setRate(rate);
            }}
          />

          <label>상품평</label>
          <textarea
            required
            value={review}
            onChange={(e) => setReview(e.target.value)}
            cols={30}
            rows={10}
          />

          <Button type="submit">상품평 작성하기</Button>
        </form>
      </div>
    </section>
  );
};

export default ReviewProductClient;
