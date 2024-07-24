import type { Metadata } from "next";

import Header from "@/container/Header";
import Navigation from "@/container/Navigation";

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
      <body className="mx-auto h-auto max-w-[390px]">
        <Header />
        <main className="min-h-[calc(100vh-144px)] w-full overflow-hidden bg-[#F7F9FA]">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
}
