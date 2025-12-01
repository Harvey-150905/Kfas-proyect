import { promises as fs } from "fs";
import path from "path";

export type User = {
  id: string;
  nombre: string;
  email: string;
  password: string;
  pueblo?: string | null;
  createdAt: string;
};

export type PublicUser = Omit<User, "password">;

export type CreateUserInput = {
  nombre: string;
  email: string;
  password: string;
  pueblo?: string | null;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "users.json");

const seedUsers: User[] = [
  {
    id: "admin",
    nombre: "Administrador",
    email: "admin@conectapueblos.com",
    password: "conecta123",
    pueblo: "Barcelona",
    createdAt: new Date().toISOString(),
  },
];

async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(seedUsers, null, 2), "utf8");
  }
}

async function readData(): Promise<User[]> {
  await ensureDataFile();
  const content = await fs.readFile(dataFile, "utf8");
  const data = JSON.parse(content) as User[];
  return data;
}

async function saveData(users: User[]): Promise<void> {
  await fs.writeFile(dataFile, JSON.stringify(users, null, 2), "utf8");
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await readData();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export async function findUserById(id: string): Promise<PublicUser | undefined> {
  const users = await readData();
  const user = users.find((entry) => entry.id === id);
  return user ? toPublicUser(user) : undefined;
}

export async function createUser(input: CreateUserInput): Promise<PublicUser> {
  const users = await readData();
  const normalizedEmail = input.email.trim().toLowerCase();
  const existing = users.find((user) => user.email.toLowerCase() === normalizedEmail);

  if (existing) {
    throw new Error("El usuario ya existe");
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    nombre: input.nombre.trim(),
    email: normalizedEmail,
    password: input.password,
    pueblo: input.pueblo?.trim() || null,
    createdAt: new Date().toISOString(),
  };

  await saveData([...users, newUser]);
  return toPublicUser(newUser);
}

export async function validateCredentials(
  email: string,
  password: string,
): Promise<PublicUser | undefined> {
  const user = await findUserByEmail(email);
  if (user && user.password === password) {
    return toPublicUser(user);
  }
  return undefined;
}

export function toPublicUser(user: User): PublicUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user;
  return rest;
}
