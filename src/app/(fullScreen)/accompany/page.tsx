"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import country from "@/json/country.json";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

function Location() {
  const { register, setValue } = useFormContext();
  const [value, setChange] = useState<{ nation: string; city: string }>();
  const [isOpen, setOpen] = useState<boolean>(false);

  function onChangeCountry(obj) {
    setChange(obj);
    setValue("nation", obj.nation);
    setValue("city", obj.city);
  }

  return (
    <div className="mt-12 box-border w-full px-5">
      <p className="text-2xl font-semibold">어디로 떠나시나요?</p>
      <div className="mt-6 w-full">
        <div className="relative w-full">
          <input
            type="text"
            onFocus={() => setOpen(true)}
            className="mt-3 w-full rounded-lg bg-white p-4 text-xs shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] placeholder:text-[#8592A0]"
            placeholder="어디로 떠나시나요?"
            {...register("city")}
            required
          />
          <input
            type="text"
            hidden
            value={value?.city}
            {...register("nation")}
          />
          {isOpen && (
            <div className="absolute top-16 max-h-[200px] w-full overflow-y-auto rounded-lg bg-white px-3 py-7 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)]">
              <p className="text-base font-semibold">주요도시 선택</p>
              <hr className="my-4" />
              {country.map((v, idx) => (
                <div key={`nation-${idx}`} className="mb-5">
                  <p className="inline-block rounded-lg bg-[#226AFA] px-4 py-[2px] text-xs font-semibold text-[#F5F9FF]">
                    {v.nation}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
                    {v.city.map((item, itemIdx) => (
                      <button
                        type="button"
                        key={`city-${itemIdx}`}
                        onClick={() => {
                          onChangeCountry({ nation: v.nation, city: item });
                          setOpen(false);
                        }}
                        className="rounded-lg border border-[#8592A0] px-2 py-[2px] text-xs font-semibold text-[#8592A0]"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          type="type"
          className="mt-5 w-full rounded-lg bg-white p-4 text-xs shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] placeholder:text-[#8592A0]"
          placeholder="만날 구체적인 장소를 적어주세요 ‘Plage de Carra 해변 앞’"
          {...register("locationName")}
          // required
        />
      </div>
    </div>
  );
}

function DatePeople() {
  const { register } = useFormContext();

  return (
    <div className="mt-12 box-border w-full px-5">
      <p className="text-2xl font-semibold">더 자세한 일정을 알려주세요</p>
      <div className="mt-6 w-full rounded-lg bg-white px-4 py-3 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
        <div className="mb-2">
          <p className="font-normal text-[#667282]">여행 날짜</p>
        </div>
        <div className="flex items-center gap-x-7 text-xs font-normal text-[#667282]">
          <p>언제 만날까요?</p>
          <input
            type="datetime-local"
            min={`${new Date().toISOString().slice(0, -8)}`}
            {...register("meetingTime")}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-6 w-full rounded-lg bg-white px-4 py-3 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
        <div className="mb-2">
          <p className="font-normal text-[#667282]">참여 인원 (호스트 포함)</p>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="number"
            {...register("totalPeople", {
              setValueAs: (value) => parseInt(value, 10),
            })}
            placeholder="0"
            required
            className="w-14 rounded-md border border-[#acb0b6] px-2 py-1 text-xs"
          />
          <p className="text-xs font-normal text-[#667282]">명</p>
        </div>
      </div>
    </div>
  );
}

function Content() {
  const { register, watch, setValue } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState();

  async function fileUpload(e: any) {
    if (!e.target.files?.length) return;

    const imageFile = e.target.files[0];
    await uploadToS3(imageFile);
  }

  async function uploadToS3(file) {
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

  return (
    <div className="mt-12 box-border w-full overflow-auto px-5 pb-20">
      <p className="text-2xl font-semibold">더 자세한 일정을 알려주세요</p>
      <div className="mt-6 w-full rounded-lg bg-white px-4 py-3 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
        <p className="text-xs text-[#667282]">
          {watch("nation")} {watch("city")} |{" "}
          {dayjs(watch("meetingTime")).format("MM.DD hh.mm")} |{" "}
          {watch("totalPeople")} 명
        </p>
      </div>
      <div className="mt-6 w-full rounded-lg bg-white px-4 py-3 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
        <input
          type="text"
          {...register("title")}
          placeholder="제목을 적어주세요"
          required
          className="w-full outline-none"
        />
      </div>
      <div className="mt-6 w-full rounded-lg bg-white px-4 py-3 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
        <textarea
          {...register("content")}
          placeholder="동행 소개글을 적어주세요"
          required
          className="h-40 w-full resize-none outline-none"
        ></textarea>
      </div>
      <div
        className="mt-6 h-24 w-24 rounded-lg bg-white bg-cover bg-center bg-no-repeat px-4 py-3 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]"
        style={{ backgroundImage: `url(${file})` }}
      >
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="relative flex h-full w-full flex-col items-center justify-center"
        >
          <input
            type="file"
            ref={inputRef}
            onChange={(e) => {
              fileUpload(e);
            }}
            className="absolute h-[1px] w-[1px] opacity-0"
          />
          {!file && (
            <Image src="/camera.svg" width={20} height={20} alt="카메라" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function Accompany() {
  const methods = useForm();
  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  function renderStepComp() {
    switch (step) {
      case 1:
        return <Location />;
      case 2:
        return <DatePeople />;
      case 3:
        return <Content />;
    }
  }

  function onClickNextStep() {
    setStep(step + 1);
  }

  function onClickPrevStep() {
    setStep(step - 1);
  }

  async function onSubmit(data) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/accompany`,
        data,
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const user = window.localStorage.getItem("email");
    methods.setValue("author", "nek1717@naver.com");
  }, [methods]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="relative min-h-screen w-full"
      >
        <div className="h-full w-full pb-12">
          <div className="flex h-16 w-full items-center bg-white px-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
            <button
              type="button"
              onClick={() => {
                if (step === 1) router.push("/home");
                onClickPrevStep();
              }}
            >
              <Image
                src="/chevron-left2.png"
                width={10}
                height={20}
                alt="뒤로가기"
              />
            </button>
            <p className="w-full text-center text-xl font-medium">
              글 작성하기
            </p>
          </div>
          {renderStepComp()}
        </div>
        <div className="fixed bottom-0 flex w-[390px] flex-col items-center justify-center bg-[#F7F9FA] px-5 py-6">
          {step === 3 ? (
            <button
              type="submit"
              className="w-full rounded-xl bg-[#226AFA] py-4 text-center text-xl font-semibold text-white"
            >
              작성완료
            </button>
          ) : (
            <button
              type="button"
              onClick={onClickNextStep}
              className="w-full rounded-xl bg-[#226AFA] py-4 text-center text-xl font-semibold text-white"
            >
              다음
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
