//@ts-nocheck
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

const Certificate = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const certificateImages = [
    "/images/html-1.jpg",
    "/images/html.jpeg",
    "/images/css-1.jpg",
    "/images/css.jpeg",
    "/images/css-1.jpg",
    "/images/css-1.jpg",
    "/images/css-1.jpg",
    "/images/css-1.jpg",
  ];
  return (
    <main className="grid w-full text-[#151515] bg-[#FEFBF6] place-content-center">
      <h2 className="text-center md:text-3xl text-2xl mb-5 underline decoration-dotted decoration-[#3498db] text-[#3498db] font-bold">
        Certificates
      </h2>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper mb-5 h-[400px]"
      >
        {certificateImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              className="bg-[#95a5a6]"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </main>
  );
};

export default Certificate;
