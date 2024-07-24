"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-5 text-2xl font-semibold text-[#226AFA]">
        여행 동행을 찾을 때는
      </h1>
      <Image src="/logo3.png" width={182} height={60} alt="logo" />
      <div className="absolute bottom-0 box-border w-full px-5 pb-20">
        <button
          type="button"
          onClick={() => router.push("/onboarding")}
          className="flex w-full items-center justify-center gap-1 rounded-xl bg-[#F9E001] py-4"
        >
          <Image src="/kakao.png" width={20} height={20} alt="kakao" />
          <span className="text-xl font-medium text-[#495565]">
            카카오로 로그인
          </span>
        </button>
        <button
          type="button"
          onClick={() => router.push("/onboarding")}
          className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl bg-[#1EC800] py-4"
        >
          <Image src="/naver.png" width={20} height={20} alt="naver" />
          <span className="text-xl font-medium text-white">
            네이버로 로그인
          </span>
        </button>
      </div>
    </div>
  );
}
