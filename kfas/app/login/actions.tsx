"use server";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData) {
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    const uid = cred.user.uid;

    // Guardar cookie
    (await
          // Guardar cookie
          cookies()).set("conecta_uid", uid, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    redirect("/protected/actividades");
  } catch (error: any) {
    return { ok: false, message: error.message };
  }
}
    