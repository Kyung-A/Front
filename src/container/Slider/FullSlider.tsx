"use client";

import Image from "next/image";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Slider {
  data: {
    image: string;
    description: string;
    title: string;
  }[];
}

export default function FullSlider({ data }: Slider) {
  return (
    <Swiper
      pagination={{
        type: "fraction",
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Pagination, Navigation, Autoplay]}
    >
      {data.map((img, index) => (
        <SwiperSlide
          key={index}
          className="relative h-[408px] max-w-[390px] overflow-hidden"
        >
          <Image
            src={img.image}
            width={0}
            height={0}
            sizes="100%"
            className="w-full"
            alt="banner"
          />
          <div className="absolute bottom-14 left-5 z-20 w-full text-white">
            <h3 className="text-xs font-semibold">{img.description}</h3>
            <h2 className="mt-1 whitespace-pre text-2xl font-semibold">
              {img.title}
            </h2>
          </div>
          <div className="bg-gradient absolute left-0 top-0 z-10 h-[408px] w-[390px] bg-black"></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
