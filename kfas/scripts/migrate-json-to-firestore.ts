import "dotenv/config";

import { promises as fs } from "fs";
import path from "path";
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

type Pueblo = {
  id: string;
  nombre: string;
  descripcion: string;
  distancia_km?: number | null;
  imagen_url: string;
  latitud: number;
  longitud: number;
  fecha_creacion: string;
};

type User = {
  id: string;
  nombre: string;
  email: string;
  password?: string;
  pueblo?: string | null;
  rol?: string | null;
  createdAt?: string;
};

async function initAdmin() {
  const serviceJson = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!serviceJson) {
    throw new Error("❌ Falta FIREBASE_SERVICE_ACCOUNT en .env.local");
  }

  initializeApp({
    credential: cert(JSON.parse(serviceJson)),
  });

  console.log("🔥 Firebase Admin inicializado");
}


async function loadJson<T>(file: string): Promise<T[]> {
  const content = await fs.readFile(file, "utf8");
  return JSON.parse(content) as T[];
}

async function migratePueblos(dbPath: string) {
  const pueblosPath = path.join(dbPath, "pueblos.json");
  const pueblos = await loadJson<Pueblo>(pueblosPath);
  const db = getFirestore();
  for (const pueblo of pueblos) {
    const ref = db.collection("pueblos").doc(pueblo.id);
    const exists = await ref.get();
    if (exists.exists) {
      console.log(`Saltando pueblo ${pueblo.id} (ya existe)`);
      continue;
    }
    await ref.set({
      nombre: pueblo.nombre,
      descripcion: pueblo.descripcion,
      distancia_km: pueblo.distancia_km ?? null,
      imagen_url: pueblo.imagen_url,
      latitud: pueblo.latitud,
      longitud: pueblo.longitud,
      fecha_creacion: pueblo.fecha_creacion ? new Date(pueblo.fecha_creacion) : new Date(),
    });
    console.log(`Insertado pueblo ${pueblo.id}`);
  }
}

async function migrateUsers(dbPath: string) {
  const usersPath = path.join(dbPath, "users.json");
  const users = await loadJson<User>(usersPath);
  const db = getFirestore();
  const auth = getAuth();
  for (const user of users) {
    try {
      await auth.getUserByEmail(user.email);
      console.log(`Usuario auth ${user.email} ya existe, no se crea`);
    } catch {
      await auth.createUser({
        uid: user.id,
        email: user.email,
        password: user.password || "Temporal123!",
        displayName: user.nombre,
      });
      console.log(`Usuario auth creado ${user.email}`);
    }

    const ref = db.collection("usuarios").doc(user.id);
    const exists = await ref.get();
    if (exists.exists) {
      console.log(`Saltando usuario ${user.id} (ya existe)`);
      continue;
    }
    await ref.set({
      nombre: user.nombre,
      email: user.email.toLowerCase(),
      password: user.password ?? "",
      pueblo: user.pueblo ?? null,
      rol: user.rol ?? null,
      createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
    });
    console.log(`Insertado usuario ${user.id}`);
  }
}

async function main() {
  const dataDir = path.join(process.cwd(), "data");
  await initAdmin();
  await migratePueblos(dataDir);
  await migrateUsers(dataDir);
  console.log("Migración completada");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
