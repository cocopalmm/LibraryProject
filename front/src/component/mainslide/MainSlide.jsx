import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './MainSlideStyle.css';
import MainListImage1 from '../../png/MainList1.png';
import MainListImage2 from '../../png/MainList2.png';
import MainListImage3 from '../../png/MainList3.png';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function MainSlide() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className="swiper-wrapper">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="swiper mySwiper"
      >
        <SwiperSlide className="swiper-slide">
          <img src={MainListImage1} alt="이미지1" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={MainListImage2} alt="이미지2" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={MainListImage3} alt="이미지3" />
        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
