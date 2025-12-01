import { cookies } from "next/headers";
import ActivitiesClient from "./ActivitiesClient";
import { findUserById } from "@/lib/users";

export default async function ActividadesPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("conecta_auth");
  const user = session?.value ? await findUserById(session.value) : undefined;

  return <ActivitiesClient user={user} />;
}
