import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export type Pueblo = {
  id: string;
  nombre: string;
  descripcion: string;
  distancia_km?: number | null;
  imagen_url: string;
  latitud: number;
  longitud: number;
  fecha_creacion: string;
};

const pueblosCol = collection(db, "pueblos");
const actividadesSub = (puebloId: string) => collection(db, "pueblos", puebloId, "actividades");
const mensajesSub = (puebloId: string) => collection(db, "pueblos", puebloId, "mensajes");

export async function getPueblos(): Promise<Pueblo[]> {
  const pueblosQuery = query(pueblosCol, orderBy("nombre"));
  const snapshot = await getDocs(pueblosQuery);
  return snapshot.docs.map((doc) => puebloFromDoc(doc.id, doc.data()));
}

export async function getPuebloById(id: string): Promise<Pueblo | undefined> {
  const ref = doc(pueblosCol, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return undefined;
  return puebloFromDoc(snap.id, snap.data());
}

export type CreatePuebloInput = {
  nombre: string;
  descripcion: string;
  distancia_km?: number | null;
  imagen_url: string;
  latitud: number;
  longitud: number;
};

export async function createPueblo(input: CreatePuebloInput): Promise<Pueblo> {
  const docRef = await addDoc(pueblosCol, {
    nombre: input.nombre,
    descripcion: input.descripcion,
    distancia_km: input.distancia_km ?? null,
    imagen_url: input.imagen_url,
    latitud: input.latitud,
    longitud: input.longitud,
    fecha_creacion: serverTimestamp(),
  });
  const created = await getDoc(docRef);
  return puebloFromDoc(created.id, created.data());
}

export async function updatePueblo(id: string, data: Partial<CreatePuebloInput>): Promise<void> {
  const ref = doc(pueblosCol, id);
  await updateDoc(ref, data);
}

export async function deletePueblo(id: string): Promise<void> {
  const ref = doc(pueblosCol, id);
  await deleteDoc(ref);
}

export type Actividad = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora?: string | null;
  categoria?: string | null;
  lugar?: string | null;
  organizador?: string | null;
  imagen?: string | null;
  avatar?: string | null;
  fecha_creacion: string;
};

export type CreateActividadInput = Omit<Actividad, "id" | "fecha_creacion">;

export async function getActividades(puebloId: string): Promise<Actividad[]> {
  const actividadesQuery = query(actividadesSub(puebloId), orderBy("fecha_creacion", "desc"));
  const snapshot = await getDocs(actividadesQuery);
  return snapshot.docs.map((doc) => actividadFromDoc(doc.id, doc.data()));
}

export async function createActividad(puebloId: string, data: CreateActividadInput): Promise<Actividad> {
  const docRef = await addDoc(actividadesSub(puebloId), {
    ...data,
    fecha_creacion: serverTimestamp(),
  });
  const created = await getDoc(docRef);
  return actividadFromDoc(created.id, created.data());
}

export type Mensaje = {
  id: string;
  contenido: string;
  autor?: string | null;
  fecha_creacion: string;
};

export type CreateMensajeInput = Omit<Mensaje, "id" | "fecha_creacion">;

export async function getMensajes(puebloId: string): Promise<Mensaje[]> {
  const mensajesQuery = query(mensajesSub(puebloId), orderBy("fecha_creacion", "desc"));
  const snapshot = await getDocs(mensajesQuery);
  return snapshot.docs.map((doc) => mensajeFromDoc(doc.id, doc.data()));
}

export async function createMensaje(puebloId: string, data: CreateMensajeInput): Promise<Mensaje> {
  const docRef = await addDoc(mensajesSub(puebloId), { ...data, fecha_creacion: serverTimestamp() });
  const created = await getDoc(docRef);
  return mensajeFromDoc(created.id, created.data());
}

function puebloFromDoc(id: string, data: any): Pueblo {
  return {
    id,
    nombre: data.nombre,
    descripcion: data.descripcion,
    distancia_km: data.distancia_km ?? null,
    imagen_url: data.imagen_url,
    latitud: Number(data.latitud),
    longitud: Number(data.longitud),
    fecha_creacion:
      data.fecha_creacion instanceof Timestamp
        ? data.fecha_creacion.toDate().toISOString()
        : data.fecha_creacion ?? new Date().toISOString(),
  };
}

function actividadFromDoc(id: string, data: any): Actividad {
  return {
    id,
    titulo: data.titulo,
    descripcion: data.descripcion,
    fecha: data.fecha,
    hora: data.hora ?? null,
    categoria: data.categoria ?? null,
    lugar: data.lugar ?? null,
    organizador: data.organizador ?? null,
    imagen: data.imagen ?? null,
    avatar: data.avatar ?? null,
    fecha_creacion:
      data.fecha_creacion instanceof Timestamp
        ? data.fecha_creacion.toDate().toISOString()
        : data.fecha_creacion ?? new Date().toISOString(),
  };
}

function mensajeFromDoc(id: string, data: any): Mensaje {
  return {
    id,
    contenido: data.contenido,
    autor: data.autor ?? null,
    fecha_creacion:
      data.fecha_creacion instanceof Timestamp
        ? data.fecha_creacion.toDate().toISOString()
        : data.fecha_creacion ?? new Date().toISOString(),
  };
}
