"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import TravelFeedSlider from "@/container/Slider/TravelFeedSlider";
import FullSlider from "@/container/Slider/FullSlider";
import images from "@/json/mainBanner.json";
import TriviFeedSlider from "@/container/Slider/TriviFeedSlider";
import posts2 from "@/json/post2.json";
import axios from "axios";

export default function Main() {
  const [top3List, setTop3List] = useState();

  async function fetchListTop3() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/accompany/top3`,
      );

      if (response.status === 200) {
        setTop3List(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      fetchListTop3();
    }
  }, []);

  return (
    <>
      <FullSlider data={images} />
      <h1 className="px-5 py-5 text-xl font-semibold">
        민아님 안녕하세요! <br />
        여행을 떠날 준비되셨나요?
      </h1>
      <section className="w-full pb-16">
        <div className="flex items-center justify-between px-5 py-3">
          <h2 className="text-base font-semibold">
            김민아님을 위한 추천 여행 피드
          </h2>
          <Link href="/list" className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#A8B2BE]">더보기</span>
            <Image
              src="chevron-right.svg"
              width={6}
              height={6}
              alt=" 더보기"
              className="ml-2"
            />
          </Link>
        </div>
        <div className="pl-5">
          <TravelFeedSlider data={top3List} />
        </div>
      </section>
      <section className="w-full px-5 pb-6">
        <Image
          src="/promotion.png"
          width={0}
          height={0}
          sizes="100%"
          className="w-full"
          alt="홍보배너"
        />
      </section>
      <section className="w-full pb-16">
        <div className="flex items-center justify-between px-5 py-3">
          <h2 className="text-base font-semibold">트리비의 추천 인기 여행지</h2>
          {/* <Link href="#" className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#A8B2BE]">더보기</span>
            <Image
              src="chevron-right.svg"
              width={6}
              height={6}
              alt=" 더보기"
              className="ml-2"
            />
          </Link> */}
        </div>
        <div className="pl-5">
          <TriviFeedSlider data={posts2} />
        </div>
      </section>
    </>
  );
}
