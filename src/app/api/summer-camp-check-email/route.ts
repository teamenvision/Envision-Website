import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const scriptURL = process.env.SUMMERCAMP_GOOGLE_APPS_SCRIPT_URL;
    if (!scriptURL) throw new Error("SUMMERCAMP_GOOGLE_APPS_SCRIPT_URL not defined");

    const response = await fetch(scriptURL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, checkEmail: true }),
    });


    const result = await response.json();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ status: "error", message: "Email check failed", error: String(err) }, { status: 500 });
  }
}
