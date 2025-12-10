"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Pueblo } from "@/lib/pueblos";

type PueblosState = {
  data: Pueblo[];
  loading: boolean;
  error: string | null;
};

export function usePueblos() {
  const [state, setState] = useState<PueblosState>({ data: [], loading: true, error: null });

  useEffect(() => {
    const pueblosQuery = query(collection(db, "pueblos"), orderBy("nombre"));
    const unsubscribe = onSnapshot(
      pueblosQuery,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const d = doc.data() as any;
          return {
            id: doc.id,
            nombre: d.nombre,
            descripcion: d.descripcion,
            distancia_km: d.distancia_km ?? null,
            imagen_url: d.imagen_url,
            latitud: Number(d.latitud),
            longitud: Number(d.longitud),
            fecha_creacion: d.fecha_creacion?.toDate?.().toISOString?.() ?? new Date().toISOString(),
          } as Pueblo;
        });
        setState({ data, loading: false, error: null });
      },
      (error) => {
        setState({ data: [], loading: false, error: error.message });
      },
    );

    return () => unsubscribe();
  }, []);

  return state;
}
