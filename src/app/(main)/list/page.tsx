"use client";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function List() {
  const [city, setCity] = useState<string>();
  const [date, setDate] = useState<string>();
  const [list, setList] = useState<any[]>();

  const param = useSearchParams();
  const cityParam = param.get("city");
  const dateParam = param.get("date");

  async function fetchList() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/accompany/search?city=${city}&date=${date}`,
      );
      if (response.status === 200) {
        setList(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if ((cityParam || dateParam) && (city || date)) {
      fetchList();
    }
  }, [city, date]);

  useEffect(() => {
    if (cityParam || dateParam) {
      setCity(cityParam as string);
      setDate(dateParam as string);
    }
  }, [cityParam, dateParam]);

  return (
    <div className="w-full px-5">
      <>
        <div className="mt-6 flex items-center gap-x-2">
          <input
            type="text"
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="어느 나라로 여행을 떠나시나요?"
            className="w-full rounded-lg border px-4 py-2"
          />
          <button
            type="button"
            onClick={fetchList}
            className="shrink-0 rounded-lg bg-[#226AFA] px-4 py-2 text-white"
          >
            검색
          </button>
        </div>
        <input
          type="date"
          defaultValue={
            date && new Date(date as string).toISOString()?.slice(0, 10)
          }
          onChange={(e) => setDate(e.target.value)}
          className="mt-2 w-full rounded-lg border px-4 py-2"
        />
      </>
      <div className="mt-6 flex flex-col gap-4">
        {list?.map((post, i) => (
          <Link
            href={{
              pathname: `/list/${20}`,
              query: { city: city, date: date },
            }}
            key={`post-${i}`}
            className="w-full rounded-lg bg-white px-3 py-4 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]"
          >
            <div className="inline-block rounded-full bg-[#D2E2FF] px-3 py-1 text-xs font-semibold text-[#226AFA]">
              {city}
            </div>
            <p className="mt-1">{post.title}</p>
            <div className="mt-1 flex items-center gap-3 text-xs text-[#8592A0]">
              <p>{post.city}</p>
              <p>{dayjs(post.meetingTime).format("MM월 DD일 hh시")}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
