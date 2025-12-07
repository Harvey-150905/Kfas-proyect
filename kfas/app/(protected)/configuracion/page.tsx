import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findUserById } from "@/lib/users";
import ConfiguracionClient from "./ConfiguracionClient";

export default async function ConfiguracionPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("conecta_auth");

  if (!session && process.env.ALLOW_UNAUTH_VIEW !== "true") {
    redirect("/login");
  }

  const user = session?.value ? await findUserById(session.value) : undefined;

  return <ConfiguracionClient user={user} />;
}
