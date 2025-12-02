import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findUserById } from "@/lib/users";
import ProfileClient from "./profile-client";

export default async function PerfilPage() {
  const cookieStore = cookies();
  const session = (await cookieStore).get("conecta_auth");

  if (!session) {
    redirect("/login");
  }

  const user = session?.value ? await findUserById(session.value) : undefined;

  return <ProfileClient user={user} />;
}
