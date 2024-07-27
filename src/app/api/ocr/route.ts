import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const image = await request.json();
  const url = process.env.NEXT_PUBLIC_OCR_API as string;

  try {
    const response = await axios.post(
      url,
      {
        images: [
          {
            format: "jpg",
            name: "medium",
            data: null,
            url: image.data,
          },
        ],
        lang: "ko",
        requestId: "string",
        resultType: "string",
        timestamp: new Date().getTime(),
        version: "V1",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-OCR-SECRET": process.env.NEXT_PUBLIC_OCR_KEY,
        },
      },
    );

    return new NextResponse(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("server error", {
      status: 500,
    });
  }
}
