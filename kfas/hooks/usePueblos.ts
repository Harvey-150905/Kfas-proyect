"use client";

import { useEffect, useState } from "react";
import type { Pueblo } from "../lib/pueblos";

type PueblosState = {
  data: Pueblo[];
  loading: boolean;
  error: string | null;
};

export function usePueblos() {
  const [state, setState] = useState<PueblosState>({ data: [], loading: true, error: null });

  useEffect(() => {
    let active = true;

    const fetchPueblos = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response = await fetch("/api/pueblos", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("No se pudieron cargar los pueblos");
        }
        const payload = await response.json();
        if (!active) return;
        setState({ data: payload.pueblos ?? [], loading: false, error: null });
      } catch (error) {
        if (!active) return;
        setState({ data: [], loading: false, error: (error as Error).message });
      }
    };

    fetchPueblos();

    return () => {
      active = false;
    };
  }, []);

  return state;
}

