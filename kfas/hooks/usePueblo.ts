"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Pueblo } from "@/lib/pueblos";

type PuebloState = {
  data: Pueblo | null;
  loading: boolean;
  error: string | null;
};

export function usePueblo(id?: string) {
  const [state, setState] = useState<PuebloState>({ data: null, loading: !!id, error: null });

  useEffect(() => {
    if (!id) return;
    const ref = doc(db, "pueblos", id);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) {
          setState({ data: null, loading: false, error: "No encontrado" });
          return;
        }
        const d = snap.data() as any;
        setState({
          data: {
            id: snap.id,
            nombre: d.nombre,
            descripcion: d.descripcion,
            distancia_km: d.distancia_km ?? null,
            imagen_url: d.imagen_url,
            latitud: Number(d.latitud),
            longitud: Number(d.longitud),
            fecha_creacion: d.fecha_creacion?.toDate?.().toISOString?.() ?? new Date().toISOString(),
          },
          loading: false,
          error: null,
        });
      },
      (error) => setState({ data: null, loading: false, error: error.message }),
    );
    return () => unsubscribe();
  }, [id]);

  return state;
}
