import Image from "next/image";
import Link from "next/link";

export default function SignUpSuccess() {
  return (
    <div className="box-border flex h-screen w-full flex-col items-center justify-center overflow-hidden px-5">
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <Image src="/success.svg" width={48} height={48} alt="icon" />
        <p className="my-4 text-2xl font-semibold">회원가입 완료!</p>
        <p className="text-center text-base font-normal">
          반가워요!
          <br /> 트리비와 즐거운 여행해요!
        </p>
      </div>
      <div className="mb-11 mt-auto w-full">
        <Link
          href="/signUp"
          className="block w-full rounded-xl bg-[#226AFA] py-4 text-center text-xl font-semibold text-white"
        >
          로그인 하러가기
        </Link>
      </div>
    </div>
  );
}
