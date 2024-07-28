"use client";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";

export default function ListDetail() {
  const { id } = useParams();
  const param = useSearchParams();
  const city = param.get("city");
  const date = param.get("date");
  const [post, setPost] = useState<any>();

  const fetchPost = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/accompany/${id}`,
      );
      if (response.status === 200) {
        setPost(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      fetchPost();
    }
  }, [fetchPost]);

  return (
    <>
      <div className="fixed top-12 z-50 flex h-16 w-[390px] items-center bg-white px-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)]">
        <Link
          href={{
            pathname: "/list",
            query: { city: city, date: date },
          }}
        >
          <Image
            src="/chevron-left2.png"
            width={10}
            height={20}
            alt="뒤로가기"
          />
        </Link>
        <p className="w-full text-center text-xl font-medium">본인인증</p>
      </div>
      {post?.imgPath && (
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
          <SwiperSlide className="relative !h-[280px] max-w-[390px] overflow-hidden bg-neutral-200">
            <Image
              src={post.imgPath}
              width={0}
              height={0}
              sizes="100%"
              className="w-full -translate-y-10"
              alt="이미지"
            />
          </SwiperSlide>
        </Swiper>
      )}
      <div
        className={`flex w-full flex-col gap-5 px-5 pb-6 ${post?.imgPath ? "" : "pt-16"}`}
      >
        {/* 프로필 */}
        <section className="mt-6 rounded-xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
          <div className="flex items-center px-6 py-4">
            <div className="w-16 rounded-full">
              <Image
                src="/profile.png"
                width={0}
                height={0}
                sizes="100%"
                className="w-full"
                alt="profile"
              />
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold">{post?.userNickname}</p>
            </div>
          </div>
        </section>
        {/* 제목 */}
        <section className="overflow-hidden rounded-xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
          <div className="inline-block rounded-br-xl bg-[#226AFA] px-5 py-2 text-xs font-semibold text-white">
            제목
          </div>
          <div className="px-6 pb-4">
            <p className="mt-4 truncate text-base font-semibold">
              {post?.title}
            </p>
          </div>
        </section>
        {/* 상세일정 */}
        <section className="overflow-hidden rounded-xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
          <div className="inline-block rounded-br-xl bg-[#226AFA] px-5 py-2 text-xs font-semibold text-white">
            제목
          </div>
          <div className="px-6 py-4">
            <div className="flex items-center gap-2">
              <Image
                src="/location-fill.svg"
                width={20}
                height={20}
                alt="장소"
              />
              <p className="text-xs font-normal">
                {post?.nation} {post?.city}
              </p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Image src="/calender.svg" width={20} height={20} alt="날짜" />
              <p className="text-xs font-normal">
                {post && dayjs(post?.meetingTime).format("YYYY.MM.DD hh:mm")}
              </p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Image src="/group.svg" width={20} height={20} alt="인원" />
              <p className="text-xs font-normal">{post?.totalPeople}명</p>
            </div>
          </div>
        </section>
        {/* 여행소개 */}
        <section className="overflow-hidden rounded-xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
          <div className="inline-block rounded-br-xl bg-[#226AFA] px-5 py-2 text-xs font-semibold text-white">
            제목
          </div>
          <div className="px-6 pb-4">
            <p className="mt-4 break-keep text-xs font-light text-[#495565]">
              {post?.content}
            </p>
          </div>
        </section>
        {/* <button className="">참여하기</button> */}
      </div>
    </>
  );
}
