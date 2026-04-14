import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const response = await fetch(`${env.apiBaseUrl}/api/v1/applications/draft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("authorization") ?? "",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const body = await response.json();
    return NextResponse.json(body, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Could not forward application to API." },
      { status: 502 },
    );
  }
}
