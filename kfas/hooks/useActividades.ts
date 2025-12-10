"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Actividad } from "@/lib/pueblos";

type ActividadesState = {
  data: Actividad[];
  loading: boolean;
  error: string | null;
};

export function useActividades(puebloId?: string) {
  const [state, setState] = useState<ActividadesState>({ data: [], loading: !!puebloId, error: null });

  useEffect(() => {
    if (!puebloId) return;
    const actividadesQuery = query(collection(db, "pueblos", puebloId, "actividades"), orderBy("fecha_creacion", "desc"));
    const unsubscribe = onSnapshot(
      actividadesQuery,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const d = doc.data() as any;
          return {
            id: doc.id,
            titulo: d.titulo,
            descripcion: d.descripcion,
            fecha: d.fecha,
            hora: d.hora ?? null,
            categoria: d.categoria ?? null,
            lugar: d.lugar ?? null,
            organizador: d.organizador ?? null,
            imagen: d.imagen ?? null,
            avatar: d.avatar ?? null,
            fecha_creacion: d.fecha_creacion?.toDate?.().toISOString?.() ?? new Date().toISOString(),
          } as Actividad;
        });
        setState({ data, loading: false, error: null });
      },
      (error) => setState({ data: [], loading: false, error: error.message }),
    );
    return () => unsubscribe();
  }, [puebloId]);

  return state;
}
