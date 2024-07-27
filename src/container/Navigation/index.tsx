import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="sticky bottom-0 z-50 mt-auto box-border h-24 w-full bg-white p-5 shadow-[4px_0px_12px_0px_rgba(0,0,0,0.04)]">
      <ul className="flex h-full w-full items-center justify-between">
        <li>
          <Link href="#" className="flex flex-col items-center gap-2">
            <div className="w-6">
              <Image
                src="/home.png"
                width={0}
                height={0}
                sizes="100%"
                className="w-full"
                alt="home"
              />
            </div>
            <span className="text-base font-medium text-[#8592A0]">홈</span>
          </Link>
        </li>
        <li>
          <Link href="/list" className="flex flex-col items-center gap-2">
            <div className="w-6">
              <Image
                src="/list.png"
                width={0}
                height={0}
                sizes="100%"
                className="w-full"
                alt="home"
              />
            </div>
            <span className="text-base font-medium text-[#8592A0]">게시판</span>
          </Link>
        </li>
        <li>
          <Link href="/accompany">
            <div className="w-12">
              <Image
                src="/add.png"
                width={0}
                height={0}
                sizes="100%"
                className="w-full"
                alt="home"
              />
            </div>
          </Link>
        </li>
        <li>
          <Link href="#" className="flex flex-col items-center gap-2">
            <div className="w-6">
              <Image
                src="/msg.png"
                width={0}
                height={0}
                sizes="100%"
                className="w-full"
                alt="home"
              />
            </div>
            <span className="text-base font-medium text-[#8592A0]">메세지</span>
          </Link>
        </li>
        <li>
          <Link href="/mypage" className="flex flex-col items-center gap-2">
            <div className="w-6">
              <Image
                src="/my.png"
                width={0}
                height={0}
                sizes="100%"
                className="w-full"
                alt="home"
              />
            </div>
            <span className="text-base font-medium text-[#8592A0]">내정보</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
