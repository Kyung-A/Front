"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import typeList from "@/json/onboardingType.json";
import Image from "next/image";
import Link from "next/link";
import TypeLoading from "./typeLoading";

interface type {
  id: string;
  image: string;
  title: string;
  description: string;
  color: string;
}

export default function MyType() {
  const [loading, setLoading] = useState<boolean>(true);
  const [myType, setMyType] = useState<type>();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setMyType(typeList.find((v) => v.id === type));
  }, [type]);

  const description = myType?.description;

  return loading ? (
    <TypeLoading />
  ) : (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="flex h-[calc(100vh-80px)] w-full flex-col items-center overflow-y-auto px-5 pb-6">
        <p
          style={{ color: myType?.color }}
          className="mt-16 text-xl font-semibold"
        >
          내 여행 타입은
        </p>
        <p className="mt-3 whitespace-pre text-center text-2xl font-semibold">
          {myType?.title}
        </p>
        <div className="mt-10">
          <Image
            src={myType?.image as string}
            width={244}
            height={256}
            alt="type"
          />
        </div>
        <p className="mt-16 box-border w-full whitespace-pre-wrap rounded-xl bg-white p-5 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.04)]">
          <div
            dangerouslySetInnerHTML={{ __html: description as string }}
            className="break-keep"
          ></div>
        </p>
      </div>
      <div className="sticky bottom-0 flex h-20 w-full flex-col items-center justify-center bg-[#F7F9FA] px-5 shadow-[4px_0px_12px_0px_rgba(0,0,0,0.04)]">
        <Link
          href="/home"
          style={{ backgroundColor: myType?.color }}
          className="block w-full rounded-xl py-4 text-center text-xl font-semibold text-white"
        >
          나와 딱 맞는 동행 추천받기
        </Link>
      </div>
    </div>
  );
}
