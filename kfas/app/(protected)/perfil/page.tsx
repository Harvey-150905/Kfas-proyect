import { cookies } from "next/headers";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function PerfilPage() {
  const uid = (await cookies()).get("conecta_uid")?.value!;
  const snap = await getDoc(doc(db, "usuarios", uid));
  const user = snap.data();

  return (
    <div>
      <h1>Mi Perfil</h1>
      <p>Nombre: {user?.nombre}</p>
      <p>Email: {user?.email}</p>
      <p>Creado: {user?.creado?.toDate?.().toLocaleString()}</p>
    </div>
  );
}
