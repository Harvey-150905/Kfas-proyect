import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export type Notificacion = {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  read: boolean;
  createdAt: string;
};

const notificacionesCol = collection(db, "notificaciones");

export async function getNotificaciones(userId: string): Promise<Notificacion[]> {
  const q = query(notificacionesCol, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs
    .map((doc) => {
      const d = doc.data() as any;
      return {
        id: doc.id,
        userId: d.userId,
        title: d.title,
        description: d.description ?? null,
        read: !!d.read,
        createdAt: d.createdAt?.toDate?.().toISOString?.() ?? new Date().toISOString(),
      } as Notificacion;
    })
    .filter((n) => n.userId === userId);
}

export async function createNotificacion(input: Omit<Notificacion, "id" | "createdAt" | "read">) {
  await addDoc(notificacionesCol, { ...input, read: false, createdAt: serverTimestamp() });
}

export async function markNotificacionLeida(id: string) {
  const ref = doc(notificacionesCol, id);
  await updateDoc(ref, { read: true });
}
