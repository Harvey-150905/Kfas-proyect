// ===========================
// Firebase Client SDK (Next.js)
// Configuración profesional
// ===========================

import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// ---- Validación de claves obligatorias ----
const requiredEnv = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.warn(`⚠️ Advertencia: Falta la variable ${key}. Firebase podría fallar.`);
  }
}

// ---- Configuración Firebase REAL ----
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// ---- Inicializar Firebase (solo 1 vez) ----
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// =============================
// EMULADORES (solo en desarrollo)
// =============================

const useEmulators = process.env.NEXT_PUBLIC_USE_EMULATORS === "true";
// Emuladores solo si NEXT_PUBLIC_USE_EMULATOR === "1"
if (process.env.NEXT_PUBLIC_USE_EMULATOR === "1") {
  console.warn("⚠️ Conectado a EMULADORES Firebase");
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8085);
} else {
  console.log("🔥 Firebase conectado a PRODUCCIÓN");
}

