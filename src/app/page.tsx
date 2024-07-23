import Image from "next/image";
import Link from "next/link";

import TravelFeedSlider from "@/container/Slider/TravelFeedSlider";
import FullSlider from "@/container/Slider/FullSlider";
import images from "@/json/mainBanner.json";
import posts from "@/json/post.json";

export default function Home() {
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
          <Link href="#" className="flex items-center justify-between">
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
          <TravelFeedSlider data={posts} />
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
          <Link href="#" className="flex items-center justify-between">
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
          <TravelFeedSlider data={posts} />
        </div>
      </section>
    </>
  );
}
