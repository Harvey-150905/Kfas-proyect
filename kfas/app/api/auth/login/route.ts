import { NextResponse } from "next/server";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const token = await cred.user.getIdToken();

    const res = NextResponse.json({ ok: true });

    // cookie segura
    res.cookies.set("conecta_uid", cred.user.uid, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err.code }, { status: 400 });
  }
}
