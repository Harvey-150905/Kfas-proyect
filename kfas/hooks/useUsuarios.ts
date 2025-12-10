"use client";

import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import type { PublicUser } from "@/lib/users";

type UsuariosState = {
  data: PublicUser[];
  loading: boolean;
  error: string | null;
};

export function useUsuarios() {
  const [state, setState] = useState<UsuariosState>({ data: [], loading: true, error: null });

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "usuarios"),
      (snap) => {
        const data = snap.docs.map((docSnap) => {
          const d = docSnap.data() as any;
          return {
            id: docSnap.id,
            nombre: d.nombre,
            email: d.email,
            rol: d.rol ?? null,
            pueblo: d.pueblo ?? null,
            createdAt: d.createdAt?.toDate?.().toISOString?.() ?? new Date().toISOString(),
          } as PublicUser;
        });
        setState({ data, loading: false, error: null });
      },
      (err) => setState({ data: [], loading: false, error: err.message }),
    );
    return () => unsub();
  }, []);

  return state;
}
