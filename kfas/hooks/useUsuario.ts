"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { PublicUser } from "@/lib/users";

type UsuarioState = {
  data: PublicUser | null;
  loading: boolean;
  error: string | null;
};

export function useUsuario(id?: string) {
  const [state, setState] = useState<UsuarioState>({ data: null, loading: !!id, error: null });

  useEffect(() => {
    if (!id) return;
    const ref = doc(db, "usuarios", id);
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
            email: d.email,
            pueblo: d.pueblo ?? null,
            rol: d.rol ?? null,
            createdAt: d.createdAt?.toDate?.().toISOString?.() ?? new Date().toISOString(),
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
