import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#226AFA]">
      <h1 className="mb-5 text-2xl font-semibold text-white">
        여행 동행을 찾을 때는
      </h1>
      <Image src="/logo2.png" width={182} height={60} alt="logo" />
    </div>
  );
}
