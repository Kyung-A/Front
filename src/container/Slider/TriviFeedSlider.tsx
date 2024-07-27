"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Link from "next/link";

interface Slider {
  data: {
    title: string;
    description: string;
    img: string;
    date: string;
  }[];
}

export default function TriviFeedSlider({ data }: Slider) {
  return (
    <Swiper
      autoHeight={true}
      slidesPerView={"auto"}
      spaceBetween={12}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
    >
      {data.map((post, i) => (
        <SwiperSlide
          key={i}
          className="!w-[308px] rounded-xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.04)]"
        >
          <Link href="#">
            <main className="w-full">
              <div className="relative flex h-[334px] w-full flex-col items-center justify-center overflow-hidden rounded-tl-xl rounded-tr-xl">
                <Image
                  src={post.img}
                  width={0}
                  height={0}
                  sizes="100%"
                  className="w-full"
                  alt="post"
                />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <p className="whitespace-pre text-lg font-semibold">
                    {post.title}
                  </p>
                  <p className="text-xs font-normal">{post.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-5 py-5">
                <Image
                  src="/trivi-post-logo.svg"
                  width={24}
                  height={24}
                  alt="logo"
                />
                <p className="text-xs font-normal text-[#A8B2BE]">
                  {post.date}
                </p>
              </div>
            </main>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
