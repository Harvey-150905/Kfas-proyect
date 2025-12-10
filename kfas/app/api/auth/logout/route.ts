import { NextResponse } from "next/server";

export function GET() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set("conecta_uid", "", {
    path: "/",
    expires: new Date(0),
  });

  return res;
}
