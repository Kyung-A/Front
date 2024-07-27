"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-5 text-2xl font-semibold text-[#226AFA]">
        여행 동행을 찾을 때는
      </h1>
      <Image src="/logo3.png" width={182} height={60} alt="logo" />
      <div className="absolute bottom-0 box-border w-full px-5 pb-20">
        <Link
          href="/login"
          className="flex w-full items-center justify-center gap-1 rounded-xl bg-[#226AFA] py-4"
        >
          <span className="text-xl font-medium text-white">
            이메일로 로그인
          </span>
        </Link>
        <Link
          href="/signUp/argee"
          className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl"
        >
          <span className="text-xx font-normal text-[#667282]">
            트리비 회원가입 하러가기
          </span>
        </Link>
      </div>
    </div>
  );
}
