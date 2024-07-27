"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import agree from "@/json/agree.json";

export default function Agree() {
  const [value, setValue] = useState(agree);
  const [all, setAll] = useState<boolean>(false);

  function allChecked(checked: boolean) {
    const allcheck = value.map((item) =>
      checked ? { ...item, checked: true } : { ...item, checked: false },
    );
    setValue(allcheck);
  }

  function onChange(id: string) {
    const checked = value.map((item) =>
      id === item.id ? { ...item, checked: !item.checked } : item,
    );
    setValue(checked);
  }

  useEffect(() => {
    const filter = value.filter(
      ({ id }) => id !== "agree-4" && id !== "agree-5",
    );
    if (filter.every((v) => v.checked)) {
      setAll(true);
    } else {
      setAll(false);
    }
  }, [value]);

  return (
    <div className="relative h-screen w-full">
      <header className="flex h-16 w-full items-center bg-white px-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
        <Link href="/signUp">
          <Image
            src="/chevron-left2.png"
            width={10}
            height={20}
            alt="뒤로가기"
          />
        </Link>
        <p className="w-full text-center text-xl font-medium">회원가입</p>
      </header>
      <main className="box-border w-full px-5">
        <p className="mt-12 text-2xl font-semibold">
          서비스 이용 약관에
          <br /> 동의해 주세요.
        </p>
        <label className="mt-7 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            className="h-4 w-4 border-[#A8B2BE]"
            onChange={(e) => allChecked(e.target.checked)}
          />
          <p className="text-base font-normal">네, 모두 동의합니다.</p>
        </label>
        <hr className="my-4" />
        <div className="flex flex-col gap-4">
          {value?.map((v) => (
            <div key={v.id} className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={v.checked}
                  onChange={() => onChange(v.id)}
                  className="h-4 w-4 border-[#A8B2BE]"
                />
                <p className="text-base font-normal">{v.title}</p>
              </label>
              {v.href && (
                <Link
                  href={v.href}
                  className="text-xs text-[#A8B2BE]"
                  target="_blank"
                >
                  보기
                </Link>
              )}
            </div>
          ))}
        </div>
      </main>
      <footer className="absolute bottom-0 flex h-24 w-full flex-col items-center justify-center px-6">
        <Link
          href="/signUp/privacy"
          className={`w-full rounded-xl py-4 text-center text-xl font-semibold ${!all ? "cursor-not-allowed bg-[#E2E7EB] text-[#8592A0]" : "bg-[#226AFA] text-white"}`}
        >
          작성완료
        </Link>
      </footer>
    </div>
  );
}
