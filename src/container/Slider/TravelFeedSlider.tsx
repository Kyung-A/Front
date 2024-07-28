"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Link from "next/link";
import dayjs from "dayjs";

interface Slider {
  data:
    | {
        id: number;
        userNickname?: string;
        imgPath?: string;
        locationName?: string;
        postImage?: string;
        content?: string;
        title?: string;
        city?: string;
        meetingTime?: string;
      }[]
    | undefined;
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
      {data?.map((post) => (
        <SwiperSlide
          key={post.userNickname}
          className="!w-[308px] rounded-xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.04)]"
        >
          <Link href={`/list/${post.id}`}>
            <main className="w-full">
              {post.postImage && (
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
              )}
              {/* <div className="px-4 py-3">
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
              </div> */}
              <div className="px-4 py-5">
                <div className="inline-block rounded-lg bg-[#D2E2FF] px-2 py-1 text-xs font-semibold text-[#226AFA]">
                  {post.city}
                </div>
                <p className="my-2 truncate text-base font-semibold">
                  {post?.title}
                </p>
                <p className="line-clamp-3 w-full text-xs font-normal text-[##495565]">
                  {post?.content}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Image
                    src="/calender.svg"
                    width={14}
                    height={14}
                    alt="날짜"
                  />
                  <p className="text-xs">
                    {dayjs(post?.meetingTime).format("YYYY.MM.DD")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="text-xs font-normal text-[#A8B2BE]"
                >
                  {post.userNickname}님 작성
                </button>
              </div>
            </main>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
