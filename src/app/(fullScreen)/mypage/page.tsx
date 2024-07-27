"use client";
import axios from "axios";
import Image from "next/image";
import { SetStateAction, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Step {
  onClickNextStep: () => void;
  onClickPrevStep: () => void;
  setFile?: SetStateAction<any>;
  file?: string;
  onSubmitOCR?: (e: any) => void;
}

// 여권, 민증 선택
function Step1({ onClickNextStep }: Step) {
  const router = useRouter();
  const [value, setValue] = useState<number>(0);

  return (
    <div className="relative h-screen w-full">
      <header className="flex h-16 w-full items-center bg-white px-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
        <button onClick={() => router.push("/home")} type="button">
          <Image
            src="/chevron-left2.png"
            width={10}
            height={20}
            alt="뒤로가기"
          />
        </button>
        <p className="w-full text-center text-xl font-medium">본인인증</p>
      </header>
      <main className="box-border w-full px-5">
        <p className="mt-7 text-xl font-medium">
          신분증 인증 수단을
          <br />
          선택해 주세요.
        </p>
        <div className="mt-8 box-border w-full rounded-2xl bg-white p-4 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
          <p className="text-xs font-semibold">신분증 예시</p>
          <div className="mt-4 flex items-center justify-between">
            <Image
              src="/passport1.jpg"
              width={142}
              height={92}
              alt="passport"
            />
            <Image
              src="/passport2.png"
              width={142}
              height={92}
              alt="passport"
            />
          </div>
        </div>
        <div className="mt-8">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="passport"
              className="input-radio"
              value="1"
              onChange={(e) => setValue(Number(e.target.value))}
            />
            <p className="text-base font-normal">주민등록증 인증</p>
          </label>
          <label className="mt-5 flex items-center gap-2">
            <input
              type="radio"
              name="passport"
              className="input-radio"
              value="1"
              onChange={(e) => setValue(Number(e.target.value))}
            />
            <p className="text-base font-normal">여권 인증</p>
          </label>
        </div>
      </main>
      <footer className="absolute bottom-0 flex h-24 w-full flex-col items-center justify-center px-6">
        <button
          type="button"
          onClick={onClickNextStep}
          className={`w-full rounded-xl py-4 text-xl font-semibold ${!value ? "cursor-not-allowed bg-[#E2E7EB] text-[#8592A0]" : "bg-[#226AFA] text-white"}`}
        >
          작성완료
        </button>
      </footer>
    </div>
  );
}

// 사진 촬영 및 선택
function Step2({ onClickNextStep, onClickPrevStep, setFile }: Step) {
  const inputRef = useRef<HTMLInputElement>(null);

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

      return setFile(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative h-screen w-full">
      <header className="flex h-16 w-full items-center bg-white px-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
        <button onClick={onClickPrevStep} type="button">
          <Image
            src="/chevron-left2.png"
            width={10}
            height={20}
            alt="뒤로가기"
          />
        </button>
        <p className="w-full text-center text-xl font-medium">본인인증</p>
      </header>
      <main className="box-border w-full px-5">
        <p className="mt-7 text-xl font-medium">
          신분증 인증 수단 방법을
          <br /> 선택해 주세요.
        </p>
        <button
          onClick={() => inputRef.current?.click()}
          className="relative mt-11 w-full rounded-xl bg-white py-3 text-base font-semibold"
        >
          <input
            type="file"
            ref={inputRef}
            onChange={(e) => {
              fileUpload(e);
              onClickNextStep();
            }}
            className="absolute h-[1px] w-[1px] opacity-0"
          />
          사진 첨부하기
        </button>
      </main>
    </div>
  );
}

// 사진 랜더링
function Step3({ onClickNextStep, onClickPrevStep, file, onSubmitOCR }: Step) {
  return (
    <div className="w-full">
      <header className="flex h-16 w-full items-center bg-white px-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
        <button onClick={onClickPrevStep} type="button">
          <Image
            src="/chevron-left2.png"
            width={10}
            height={20}
            alt="뒤로가기"
          />
        </button>
        <p className="w-full text-center text-xl font-medium">본인인증</p>
      </header>
      <main className="box-border w-full px-5">
        <p className="mt-7 text-xl font-medium">
          촬영하신 신분증을
          <br /> 확인해 주세요
        </p>
        <div className="mt-2 flex h-[420px] min-h-[420px] w-full items-center overflow-hidden rounded-xl bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
          {file && (
            <Image
              src={file ?? ""}
              width={0}
              height={0}
              sizes="100%"
              className="w-full rotate-90"
              alt="본인인증"
            />
          )}
        </div>
      </main>
      <footer className="mt-6 flex w-full flex-col items-center justify-center gap-4 px-6 pb-8">
        <button
          type="button"
          onClick={onClickPrevStep}
          className="w-full rounded-xl bg-[#E2E7EB] py-4 text-xl font-semibold text-[#8592A0]"
        >
          재촬영
        </button>
        <button
          onClick={onSubmitOCR}
          className="w-full rounded-xl bg-[#226AFA] py-4 text-xl font-semibold text-white"
        >
          인증신청
        </button>
      </footer>
    </div>
  );
}

export default function Mypage() {
  const [file, setFile] = useState<string>();
  const [step, setStep] = useState<number>(1);

  function renderStepComp() {
    switch (step) {
      case 1:
        return (
          <Step1
            onClickNextStep={onClickNextStep}
            onClickPrevStep={onClickPrevStep}
          />
        );
      case 2:
        return (
          <Step2
            onClickNextStep={onClickNextStep}
            onClickPrevStep={onClickPrevStep}
            setFile={setFile}
          />
        );
      case 3:
        return (
          <Step3
            onClickNextStep={onClickNextStep}
            onClickPrevStep={onClickPrevStep}
            file={file}
            onSubmitOCR={onSubmitOCR}
          />
        );
      default:
        return (
          <Step1
            onClickNextStep={onClickNextStep}
            onClickPrevStep={onClickPrevStep}
          />
        );
    }
  }

  async function onSubmitOCR(e: any) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_API}/api/ocr`,
        { data: file },
      );
      certification(response.data);
      // console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function certification(data: any) {
    try {
      const userInfo = window.localStorage.getItem("userInfo");

      // const response = await axios.get(
      //   `${process.env.NEXT_PUBLIC_LOCAL_API}/api/v1/users/mypage/user-email/${userInfo.email}`,
      // );
      // console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  function onClickNextStep() {
    setStep(step + 1);
  }

  function onClickPrevStep() {
    setStep(step - 1);
  }

  return <>{renderStepComp()}</>;
}
