import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NotificacionesClient from "./NotificacionesClient";

export default async function NotificacionesPage() {
  const cookieStore = cookies();
  const session = (await cookieStore).get("conecta_auth");

  if (!session && process.env.ALLOW_UNAUTH_VIEW !== "true") {
    redirect("/login");
  }

  return <NotificacionesClient />;
}
