import Image from "next/image";

export default function TypeLoading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <div className="w-full">
        <Image
          src="/loading-top.png"
          width={0}
          height={0}
          sizes="100%"
          className="w-full"
          alt="bg"
        />
      </div>
      <h1 className="my-9 text-center text-2xl font-semibold">
        나의 여행 성향을
        <br />
        분석하고 있습니다
      </h1>
      <div className="w-full">
        <Image
          src="/loading-bottom.png"
          width={0}
          height={0}
          sizes="100%"
          className="w-full"
          alt="bg"
        />
      </div>
    </div>
  );
}
