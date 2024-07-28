"use client";
import _ from "lodash";
import axios from "axios";
import Image from "next/image";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Mypage() {
  const [user, setUser] = useState<any>();

  async function getMe() {
    try {
      const { email } = JSON.parse(
        window.localStorage.getItem("userInfo") as string,
      );
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/users/mypage/user-email/${email}`,
      );
      setUser(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3 bg-white px-6 py-4">
        <Link href="/home">
          <Image
            src="/chevron-left2.png"
            width={12}
            height={12}
            alt="뒤로가기"
          />
        </Link>
        <div className="text-2xl font-medium">MY</div>
      </div>
      <div className="bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-16 overflow-hidden rounded-full">
            <Image
              src={user?.imgPath}
              width={0}
              height={0}
              sizes="100%"
              className="w-full"
              alt="프로필"
            />
          </div>
          <p className="text-2xl font-semibold">{user?.name}</p>
        </div>
        {!user?.verificationYn ? (
          <div className="mt-4 flex w-full items-center gap-2 py-2">
            <input type="checkbox" checked readOnly className="h-4 w-4" />
            <p>본인인증 완료!</p>
          </div>
        ) : (
          <button className="mt-4 w-full rounded-lg border py-2">
            본인인증이 필요합니다
          </button>
        )}
      </div>
    </div>
  );
}
