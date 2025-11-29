import { promises as fs } from "fs";
import path from "path";

export type Pueblo = {
  id: string;
  nombre: string;
  descripcion: string;
  distancia_km?: number | null;
  imagen_url: string;
  latitud: number;
  longitud: number;
  fecha_creacion: string;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "pueblos.json");

const seedData: Pueblo[] = [
  {
    id: "prades",
    nombre: "Prades",
    descripcion: "Rincones de piedra roja y bosques de pino que perfuman el aire en la sierra de Prades.",
    distancia_km: 18,
    imagen_url:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80",
    latitud: 41.3089,
    longitud: 1.0183,
    fecha_creacion: new Date().toISOString(),
  },
  {
    id: "besalu",
    nombre: "Besalú",
    descripcion: "Puentes medievales y calles empedradas que conectan historias entre el Fluvià y el campo.",
    distancia_km: 42,
    imagen_url:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    latitud: 42.1983,
    longitud: 2.6975,
    fecha_creacion: new Date().toISOString(),
  },
  {
    id: "rupit",
    nombre: "Rupit i Pruit",
    descripcion: "Casas colgantes, pasarelas de madera y cascadas que guardan la calma del Collsacabra.",
    distancia_km: 56,
    imagen_url:
      "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=1200&q=80",
    latitud: 42.0242,
    longitud: 2.4665,
    fecha_creacion: new Date().toISOString(),
  },
  {
    id: "valldeflores",
    nombre: "Vall de Núria",
    descripcion: "Praderas verdes, cremallera y montañas suaves que abrazan romerías y tradiciones de altura.",
    distancia_km: 95,
    imagen_url:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80",
    latitud: 42.3876,
    longitud: 2.162,
    fecha_creacion: new Date().toISOString(),
  },
];

async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(seedData, null, 2), "utf8");
  }
}

async function readData(): Promise<Pueblo[]> {
  await ensureDataFile();
  const content = await fs.readFile(dataFile, "utf8");
  const data = JSON.parse(content) as Pueblo[];
  return data;
}

async function saveData(pueblos: Pueblo[]): Promise<void> {
  await fs.writeFile(dataFile, JSON.stringify(pueblos, null, 2), "utf8");
}

export async function getPueblos(): Promise<Pueblo[]> {
  const pueblos = await readData();
  return pueblos.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}

export async function getPuebloById(id: string): Promise<Pueblo | undefined> {
  const pueblos = await readData();
  return pueblos.find((pueblo) => pueblo.id === id);
}

export type CreatePuebloInput = {
  nombre: string;
  descripcion: string;
  distancia_km?: number | null;
  imagen_url: string;
  latitud: number;
  longitud: number;
};

export async function createPueblo(input: CreatePuebloInput): Promise<Pueblo> {
  const pueblos = await readData();
  const id = input.nombre.toLowerCase().replace(/\s+/g, "-") + "-" + crypto.randomUUID().slice(0, 6);
  const nuevo: Pueblo = {
    id,
    nombre: input.nombre,
    descripcion: input.descripcion,
    distancia_km: input.distancia_km ?? null,
    imagen_url: input.imagen_url,
    latitud: input.latitud,
    longitud: input.longitud,
    fecha_creacion: new Date().toISOString(),
  };

  await saveData([...pueblos, nuevo]);
  return nuevo;
}

