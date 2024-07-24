import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 box-border flex h-12 w-full items-center justify-between overflow-hidden bg-white px-5 py-3 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)]">
      <Link href="/">
        <Image src="/logo.svg" width={70} height={26} alt="logo" />
      </Link>
      <div className="flex items-center justify-between gap-x-5">
        <Image src="/search.png" width={20} height={20} alt="검색" />
        <Image src="/alarm.png" width={20} height={20} alt="알림" />
      </div>
    </header>
  );
}
