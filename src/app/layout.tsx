import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "트리비",
  description: "여행 동행 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="mx-auto h-auto w-auto max-w-[390px]">{children}</body>
    </html>
  );
}
