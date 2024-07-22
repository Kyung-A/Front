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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
