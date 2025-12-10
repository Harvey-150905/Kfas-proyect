import { cookies } from "next/headers";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import type { Activity } from "@/types/activity";

export default async function ActividadesPage() {
  const uid = (await cookies()).get("conecta_uid")?.value!;
  const userSnap = await getDoc(doc(db, "usuarios", uid));
  const user = userSnap.data();

  const actsSnap = await getDocs(collection(db, "actividades"));
 const actividades: Activity[] = actsSnap.docs.map(d => {
  const data = d.data() as Omit<Activity, "id">;
  return { id: d.id, ...data };
});

  return (
    <div>
      <h1>Hola {user?.nombre}</h1>
      <h2>Actividades disponibles:</h2>

      <ul>
        {actividades.map(act => (
          <li key={act.id}>{act.titulo}</li>
        ))}
      </ul>
    </div>
  );
}
