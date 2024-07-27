"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function List() {
  const [value, setValue] = useState<string>();

  async function fetchList() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/accompany/city/FUK`,
      );
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="w-full px-5">
      <div className="mt-6 flex items-center gap-x-2">
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
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
      <input type="date" className="mt-2 w-full rounded-lg border px-4 py-2" />
    </div>
  );
}
