"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Privacy {
  email: string;
  password: string;
  name: string;
  birth: string;
  gender?: "F" | "M";
  nickname: string;
  imgPath?: string;
}

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<Privacy>({
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: any) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/users/login`,
        data,
      );

      if (response.status === 200) {
        await getUserInfo(response.data.userEmail);
        window.localStorage.setItem(
          "userInfo",
          JSON.stringify({
            email: response.data.userEmail,
            session: response.data.sessionId,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserInfo(email: string) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/users/mypage/user-email/${email}`,
      );

      if (response.status === 200) {
        if (!response.data.triptype) {
          router.push("/onboarding");
        } else {
          router.push("/home");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const watchAllFields = watch();
  const isEnabled = Object.values(watchAllFields).every((value) => value);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="flex h-16 w-full items-center bg-white px-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
        <Link href="/signUp">
          <Image
            src="/chevron-left2.png"
            width={10}
            height={20}
            alt="뒤로가기"
          />
        </Link>
        <p className="w-full text-center text-xl font-medium">로그인</p>
      </div>
      <div className="box-border w-full px-5">
        <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-2xl font-semibold">
            이메일과 비밀번호를
            <br /> 입력해주세요.
          </p>
          <div className="mt-6 w-full">
            <p className="text-xs font-normal text-[#8592A0]">이메일</p>
            <input
              type="email"
              className="mt-3 w-full rounded-lg border-[#E2E7EB] bg-white p-3 text-xs placeholder:text-[#8592A0]"
              placeholder="abc123@gmail.com"
              {...register("email")}
              required
            />
            <p className="mt-6 text-xs font-normal text-[#8592A0]">비밀번호</p>
            <input
              type="password"
              className="mt-3 w-full rounded-lg border-[#E2E7EB] bg-white p-3 text-xs placeholder:text-[#8592A0]"
              placeholder="영문, 숫자, 특수기호 포함 10자 이상"
              {...register("password")}
              required
            />
          </div>
          <label className="mt-7 flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              defaultChecked
              className="h-3 w-3 border-[#A8B2BE]"
            />
            <p className="text-xs font-normal text-[#A8B2BE]">자동 로그인</p>
          </label>
          <div className="absolute bottom-0 left-0 w-full px-5 pb-9">
            <button
              type="submit"
              className={`w-full rounded-xl py-4 text-center text-xl font-semibold ${!isEnabled ? "cursor-not-allowed bg-[#E2E7EB] text-[#8592A0]" : "bg-[#226AFA] text-white"}`}
            >
              로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
