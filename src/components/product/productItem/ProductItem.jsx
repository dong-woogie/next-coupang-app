import React, { useMemo } from "react";
import styles from "./ProductItem.module.scss";
import Link from "next/link";
import Image from "next/image";
import priceFormat from "@/utils/priceFormat";
import { Rating } from "react-simple-star-rating";
import rocketBadgeIcon from "@/assets/badge-rocket.svg";
import useFetchDocuments from "@/hooks/useFetchDocuments";

const ProductItem = ({ id, name, price, imageURL }) => {
  // const { documents } = useFetchDocuments("reviews", ["productID", "==", id]);

  // const productRating = documents.reduce((prev, curr) => prev + curr.rate, 0);

  // const rate = useMemo(() => {
  //   if (documents.length === 0) return 0;
  //   return productRating / documents.length;
  // }, [productRating, documents]);

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.slice(0, n).concat("...");
      return shortenedText;
    }

    return text;
  };

  return (
    <div className={styles.grid}>
      <Link href={`/product-details/${id}`}>
        <div className={styles.img}>
          <Image src={imageURL} alt={name} width={265} height={265} />
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.details}>
          <p>{shortenText(name, 10)}</p>
          <em>
            <strong style={{ color: "#cb1400" }}>
              {priceFormat(price)}원{" "}
            </strong>

            <Image src={rocketBadgeIcon} alt="로켓배송" />
          </em>
          <div className={styles.rating}>
            <Rating
              size={17}
              // initialValue={rate}
              initialValue={3}
              readonly
            />
            <span className={styles.ratingCount}>
              {/* ({documents.length}) */}
              (10)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
