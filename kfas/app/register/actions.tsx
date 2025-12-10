"use server";

import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function registerUser(formData: FormData) {
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const nombre = formData.get("nombre")?.toString() ?? "";

  try {
    // Crear usuario en AUTH
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // Guardar en Firestore
    await setDoc(doc(db, "usuarios", uid), {
      email,
      nombre,
      avatarUrl: null,
      creado: serverTimestamp(),
    });

    return { ok: true, uid };
  } catch (error: any) {
    return { ok: false, message: error.message };
  }
}
