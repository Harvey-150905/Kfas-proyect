import crypto from "crypto";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export type User = {
  id: string;
  nombre: string;
  email: string;
  password: string;
  pueblo?: string | null;
  createdAt: string;
  rol?: string | null;
};

export type PublicUser = Omit<User, "password">;

export type CreateUserInput = {
  nombre: string;
  email: string;
  password: string;
  pueblo?: string | null;
  rol?: string | null;
};

const usersCol = collection(db, "usuarios");

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const q = query(usersCol, where("email", "==", email.toLowerCase()));
  const snap = await getDocs(q);
  const docSnap = snap.docs[0];
  if (!docSnap) return undefined;
  return userFromDoc(docSnap.id, docSnap.data());
}

export async function findUserById(id: string): Promise<PublicUser | undefined> {
  const ref = doc(usersCol, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return undefined;
  return toPublicUser(userFromDoc(snap.id, snap.data()));
}

export async function getUsuario(id: string): Promise<PublicUser | undefined> {
  return findUserById(id);
}

export async function createUser(input: CreateUserInput): Promise<PublicUser> {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new Error("El usuario ya existe");
  }

  const id = crypto.randomUUID();
  const password = hashPassword(input.password);
  const data = {
    nombre: input.nombre.trim(),
    email: input.email.trim().toLowerCase(),
    password,
    pueblo: input.pueblo?.trim() || null,
    rol: input.rol ?? null,
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(usersCol, id), data);
  const snap = await getDoc(doc(usersCol, id));
  return toPublicUser(userFromDoc(snap.id, snap.data()));
}

export async function updateUsuario(id: string, data: Partial<PublicUser>): Promise<void> {
  const ref = doc(usersCol, id);
  await setDoc(ref, data, { merge: true });
}

export async function ensureUserExists(user: PublicUser): Promise<void> {
  const existing = await findUserById(user.id);
  if (existing) return;
  await setDoc(doc(usersCol, user.id), {
    nombre: user.nombre,
    email: user.email.toLowerCase(),
    password: "",
    pueblo: user.pueblo ?? null,
    rol: (user as { rol?: string }).rol ?? null,
    createdAt: serverTimestamp(),
  });
}

export async function validateCredentials(email: string, password: string): Promise<PublicUser | undefined> {
  const user = await findUserByEmail(email);
  if (!user) return undefined;
  if (user.password && verifyPassword(password, user.password)) {
    return toPublicUser(user);
  }
  // Soporta legado texto plano si existiera
  if (!user.password && password) {
    return toPublicUser(user);
  }
  return undefined;
}

export function toPublicUser(user: User): PublicUser {
  const { password, ...rest } = user;
  return rest;
}

function userFromDoc(id: string, data: any): User {
  return {
    id,
    nombre: data.nombre,
    email: data.email,
    password: data.password ?? "",
    pueblo: data.pueblo ?? null,
    rol: data.rol ?? null,
    createdAt:
      data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt ?? new Date().toISOString(),
  };
}

function hashPassword(plain: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.pbkdf2Sync(plain, salt, 310000, 32, "sha256").toString("hex");
  return `${salt}:${derived}`;
}

function verifyPassword(plain: string, stored: string): boolean {
  if (!stored.includes(":")) {
    return stored === plain;
  }
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = crypto.pbkdf2Sync(plain, salt, 310000, 32, "sha256").toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(derived, "hex"));
}
