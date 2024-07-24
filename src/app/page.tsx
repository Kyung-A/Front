"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const userData = false;
      if (!userData) {
        router.push("/signUp");
      } else {
        router.push("/home");
      }
    }, 3000);
  }, [router]);

  return <Loading />;
}
