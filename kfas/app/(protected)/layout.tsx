import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const uid = cookieStore.get("conecta_auth")?.value;  // FIX

  if (!uid) {
    redirect("/login");
  }

  const snap = await getDoc(doc(db, "usuarios", uid));
  if (!snap.exists()) {
    redirect("/login");
  }

  return <>{children}</>;
}

