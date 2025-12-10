import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { PublicUser } from "@/lib/users";

const usuariosCol = collection(db, "usuarios");

export async function getUsuario(uid: string): Promise<PublicUser | undefined> {
  const snap = await getDoc(doc(usuariosCol, uid));
  if (!snap.exists()) return undefined;
  const data = snap.data() as any;
  return {
    id: snap.id,
    nombre: data.nombre,
    email: data.email,
    pueblo: data.pueblo ?? null,
    rol: data.rol ?? null,
    createdAt: data.createdAt?.toDate?.().toISOString?.() ?? new Date().toISOString(),
  };
}

export async function updateUsuario(uid: string, data: Partial<PublicUser>): Promise<void> {
  await updateDoc(doc(usuariosCol, uid), data);
}

export async function getAllUsuarios(): Promise<PublicUser[]> {
  const snap = await getDocs(usuariosCol);
  return snap.docs.map((docSnap) => {
    const d = docSnap.data() as any;
    return {
      id: docSnap.id,
      nombre: d.nombre,
      email: d.email,
      pueblo: d.pueblo ?? null,
      rol: d.rol ?? null,
      createdAt: d.createdAt?.toDate?.().toISOString?.() ?? new Date().toISOString(),
    };
  });
}

export async function ensureUsuario(uid: string, data: PublicUser) {
  const snap = await getDoc(doc(usuariosCol, uid));
  if (snap.exists()) return;
  await setDoc(doc(usuariosCol, uid), {
    ...data,
    createdAt: data.createdAt ?? new Date().toISOString(),
  });
}
