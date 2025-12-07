import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MensajesClient from "./MensajesClient";

export default async function MensajesPage() {
  const cookieStore = cookies();
  const session = (await cookieStore).get("conecta_auth");

  if (!session && process.env.ALLOW_UNAUTH_VIEW !== "true") {
    redirect("/login");
  }

  return <MensajesClient />;
}
