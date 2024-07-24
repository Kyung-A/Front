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
    userId: string;
    profile: string;
    location: string;
    postImage: string;
    content: string;
  }[];
}

export default function TravelFeedSlider({ data }: Slider) {
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
      {data.map((post) => (
        <SwiperSlide
          key={post.userId}
          className="!w-[308px] rounded-xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.04)]"
        >
          <Link href="#">
            <header className="box-border flex w-full items-center p-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="w-11 overflow-hidden rounded-full"
              >
                <Image
                  src={post.profile}
                  width={0}
                  height={0}
                  sizes="100%"
                  className="w-full"
                  alt="profile"
                />
              </button>
              <div className="ml-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="text-base font-medium"
                >
                  {post.userId}
                </button>
                <div className="flex items-center">
                  <Image
                    src="/location.png"
                    width={10}
                    height={12}
                    alt="icon"
                  />
                  <span className="ml-1 text-xs font-medium text-[#A8B2BE]">
                    {post.location}
                  </span>
                </div>
              </div>
            </header>
            <main className="w-full pb-4">
              <div className="flex h-44 w-full flex-col items-center justify-center overflow-hidden">
                <Image
                  src={post.postImage}
                  width={0}
                  height={0}
                  sizes="100%"
                  className="w-full"
                  alt="post"
                />
              </div>
              <div className="px-4 py-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    console.log("좋아요");
                  }}
                >
                  <Image src="/like.png" width={20} height={16} alt="좋아요" />
                </button>
              </div>
              <p className="line-clamp-3 w-full px-4 text-xs font-light text-[#667282]">
                {post.content}
              </p>
            </main>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
