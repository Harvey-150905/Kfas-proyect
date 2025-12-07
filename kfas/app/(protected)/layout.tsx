import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("conecta_auth");

  if (!session && process.env.ALLOW_UNAUTH_VIEW !== "true") {
    redirect("/login");
  }

  return <div className="min-h-screen bg-white">{children}</div>;
}

