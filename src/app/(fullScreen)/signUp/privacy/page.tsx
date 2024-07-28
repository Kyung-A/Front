"use client";

import Image from "next/image";
import { useRef, useState } from "react";
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

export default function Privacy() {
  const [file, setFile] = useState<string>();
  const [genderValue, setGenderValue] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { register, handleSubmit, watch, setValue } = useForm<Privacy>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      birth: "",
      nickname: "",
    },
  });

  async function onSubmit(data: any) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/users/join `,
        {
          ...data,
          gender: genderValue,
        },
      );

      if (response.status === 200) {
        router.push("/signUp/success");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fileUpload(e: any) {
    if (!e.target.files?.length) return;

    const imageFile = e.target.files[0];
    await uploadToS3(imageFile);
  }

  async function uploadToS3(file: any) {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/s3/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setValue("imgPath", response.data);
      setFile(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const watchAllFields = watch();
  const isEnabled = Object.values(watchAllFields).every((value) => value);

  return (
    <div className="w-full">
      <div className="flex h-16 w-full items-center bg-white px-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
        <Link href="/signUp/argee">
          <Image
            src="/chevron-left2.png"
            width={10}
            height={20}
            alt="뒤로가기"
          />
        </Link>
        <p className="w-full text-center text-xl font-medium">회원가입</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="box-border w-full px-5"
      >
        {/* 프로필 이미지 & 닉네임 */}
        <section className="mt-12">
          <p className="text-2xl font-semibold">
            이제 트리비에서 사용할
            <br /> 프로필을 등록해주세요.
          </p>
          <div className="mt-6 w-full">
            <p className="text-xs font-normal text-[#8592A0]">프로필 사진</p>
            <div className="relative mx-auto h-24 w-24">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-white">
                {file && (
                  <Image
                    src={file ?? ""}
                    width={0}
                    height={0}
                    sizes="100%"
                    className="w-full"
                    alt="프로필 이미지"
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="absolute -right-2 bottom-0 flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#D2E2FF]"
              >
                <Image src="/camera.svg" width={20} height={20} alt="카메라" />
                <input
                  ref={inputRef}
                  onChange={(e) => {
                    fileUpload(e);
                  }}
                  type="file"
                  className="absolute h-[1px] w-[1px] opacity-0"
                />
              </button>
            </div>
            <p className="mt-6 text-center text-xs font-normal text-[#8592A0]">
              프로필 등록 안할 시 기본 이미지로 등록됩니다.
            </p>
          </div>
          <div className="mt-6 w-full">
            <p className="text-xs font-normal text-[#8592A0]">닉네임</p>
            <input
              type="text"
              className="mt-3 w-full rounded-lg border-[#E2E7EB] bg-white p-3 text-xs placeholder:text-[#8592A0]"
              placeholder="한글, 영어,숫자로 된 2자로 된 2글자 이상"
              {...register("nickname")}
              required
            />
          </div>
        </section>
        {/* 개인정보 */}
        <section className="mt-12">
          <p className="text-2xl font-semibold">
            개인정보를
            <br /> 입력해주세요.
          </p>
          <div className="mt-6 w-full">
            <p className="text-xs font-normal text-[#8592A0]">이름</p>
            <input
              type="text"
              className="mt-3 w-full rounded-lg border-[#E2E7EB] bg-white p-3 text-xs placeholder:text-[#8592A0]"
              placeholder="한글, 영어,숫자로 된 2자로 된 2글자 이상"
              {...register("name")}
              required
            />
            <p className="mt-6 text-xs font-normal text-[#8592A0]">생년월일</p>
            <input
              type="text"
              className="mt-3 w-full rounded-lg border-[#E2E7EB] bg-white p-3 text-xs placeholder:text-[#8592A0]"
              placeholder="Ex. 960101"
              {...register("birth")}
              required
            />
            <p className="mt-6 text-xs font-normal text-[#8592A0]">성별</p>
            <div className="mt-3 flex items-center">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  className="input-radio"
                  name="gender"
                  value="F"
                  onChange={(e) => setGenderValue(e.target.value)}
                />
                <p className="text-base font-normal">여자</p>
              </label>
              <label className="ml-10 flex items-center gap-2">
                <input
                  type="radio"
                  className="input-radio"
                  name="gender"
                  value="M"
                  onChange={(e) => setGenderValue(e.target.value)}
                />
                <p className="text-base font-normal">남자</p>
              </label>
            </div>
          </div>
        </section>
        {/* 이메일과 비밀번호 */}
        <section className="mt-12">
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
            <p className="mt-6 text-xs font-normal text-[#8592A0]">
              비밀번호 확인
            </p>
            <input
              type="password"
              name="password2"
              className="mt-3 w-full rounded-lg border-[#E2E7EB] bg-white p-3 text-xs placeholder:text-[#8592A0]"
              placeholder="영문, 숫자, 특수기호 포함 10자 이상"
              required
            />
          </div>
        </section>
        <div className="mb-9 mt-12 flex w-full flex-col items-center justify-center">
          <button
            type="submit"
            className={`w-full rounded-xl py-4 text-center text-xl font-semibold ${!isEnabled ? "cursor-not-allowed bg-[#E2E7EB] text-[#8592A0]" : "bg-[#226AFA] text-white"}`}
          >
            작성완료
          </button>
        </div>
      </form>
    </div>
  );
}
