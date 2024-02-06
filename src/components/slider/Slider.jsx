"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import styles from "./Slider.module.scss";
import sliderData from "./SliderData";
import Image from "next/image";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderLength = sliderData.length;

  const intervalTime = 5000;

  const nextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, sliderLength]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  }, [currentSlide, sliderLength]);

  useEffect(() => {
    const interval = setInterval(nextSlide, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, [nextSlide]);

  return (
    <div className={styles.slider}>
      <AiOutlineArrowLeft
        className={`${styles.arrow} ${styles.prev}`}
        onClick={prevSlide}
      />
      <AiOutlineArrowRight
        className={`${styles.arrow} ${styles.next}`}
        onClick={nextSlide}
      />

      {sliderData.map((slider, index) => {
        const { image, heading } = slider;

        return (
          <div
            className={
              index === currentSlide
                ? `${styles.slide} ${styles.current}`
                : styles.slide
            }
            key={heading}
          >
            <Image src={image} alt={heading} fill />
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
