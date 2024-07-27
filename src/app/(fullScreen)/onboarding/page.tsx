"use client";
import { useState } from "react";
import onboarding from "@/json/onboarding.json";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

interface StepComp {
  onClickNext: () => void;
  onClickPrve: () => void;
  onClickQuestion: (value: number) => void;
  question: Step[];
  step: number;
}
interface Step {
  title: string;
  question: string[];
  value?: number;
}

function StartForm({ onClick }: { onClick: () => void }) {
  return (
    <div className="onboarding box-border flex h-screen w-full flex-col px-5">
      <h1 className="pt-20 text-2xl font-semibold">
        나에게 딱 맞는 동행 추천을 위해
        <br /> 여행 타입 분석을 해주세요!
      </h1>
      <p className="mt-3 text-base font-light text-[#8592A0]">
        트리비가 즐거운 여행을 위한
        <br /> 동행자를 추천해드려요.
        <br /> 딱 30초, 5개의 질문만 답해주세요!
      </p>
      <button
        onClick={onClick}
        className="mb-14 mt-auto box-border w-full rounded-xl bg-[#226AFA] py-4 text-xl font-semibold text-white"
      >
        여행 타입 분석하기
      </button>
    </div>
  );
}

function StepForm({
  onClickNext,
  onClickPrve,
  onClickQuestion,
  question,
  step,
}: StepComp) {
  const router = useRouter();

  // TODO
  async function onSubmitType(type: string) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/s3/image`,
        { triptype: type },
      );

      return console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative box-border flex h-screen w-full flex-col px-5">
      <div className="sticky flex h-14 w-full items-center">
        <button onClick={onClickPrve}>
          <Image
            src="/chevron-left.png"
            width={12}
            height={20}
            alt="뒤로가기"
          />
        </button>
      </div>
      <progress
        max="5"
        value={step + 1}
        className="progress mt-3 w-full appearance-none"
      ></progress>
      <h1 className="mt-8 w-full whitespace-pre text-2xl font-semibold">
        {question[step].title}
      </h1>
      <div className="mt-7">
        {question[step].question.map((v, index) => (
          <label
            key={index}
            className={`relative mb-4 box-border block w-full cursor-pointer rounded-xl bg-white p-5 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.04)] ${Number(question[step]?.value) === index + 1 ? "border border-[#226AFA]" : ""}`}
          >
            <input
              type="radio"
              name="question"
              onClick={(e: any) => onClickQuestion(e.target.value)}
              value={index + 1}
              className="absolute opacity-0"
            />
            <p
              className={`break-keep text-xl ${Number(question[step]?.value) === index + 1 ? "font-medium text-[#226AFA]" : "font-light text-[#667282]"}`}
            >
              {v}
            </p>
          </label>
        ))}
      </div>
      <button
        onClick={() => {
          if (!question[step].value) return;
          if (step !== 4) {
            onClickNext();
          } else {
            const result = `${question[0].value}, ${question[1].value}`;
            let type;

            switch (result) {
              case "1, 2":
                type = "a";
              case "1, 1":
                type = "b";
              case "2, 2":
                type = "c";
              case "2, 1":
                type = "d";
            }
            onSubmitType(type as string);
            return router.push(`/onboarding/myType?type=${type}`);
          }
        }}
        className="mb-14 mt-auto box-border w-full rounded-xl bg-[#226AFA] py-4 text-xl font-semibold text-white"
      >
        다음
      </button>
    </div>
  );
}

export default function Onboarding() {
  const [step, setStep] = useState<number>(-1);
  const [question, setQuestion] = useState<Step[]>(onboarding);

  function onClickNextStep() {
    setStep(step + 1);
  }

  function onClickPrevStep() {
    setStep(step - 1);
  }

  function onClickQuestion(value: number) {
    setQuestion((prev) => {
      const newData = [...prev];
      newData[step] = { ...newData[step], value };
      return newData;
    });
  }

  return step === -1 ? (
    <StartForm onClick={onClickNextStep} />
  ) : (
    <StepForm
      onClickNext={onClickNextStep}
      onClickPrve={onClickPrevStep}
      onClickQuestion={onClickQuestion}
      question={question}
      step={step}
    />
  );
}
