import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Permite usar __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lee el JSON de semillas
const seedPath = path.join(__dirname, "../firestore_seed.json");
const seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));

// Config Firebase solo para emulador (sin API keys)
const firebaseConfig = {
  projectId: "kafas-project",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  console.log("⏳ Importando datos a Firestore Emulator...");

  for (const colName of Object.keys(seed)) {
  console.log(`📂 Importando colección: ${colName}`);

  const col = seed[colName];

  // Si la colección es un objeto → conviértelo en array
  const items = Array.isArray(col)
    ? col
    : Object.keys(col).map(key => ({ id: key, ...col[key] }));

  for (const item of items) {
    const id = item.id || undefined;
    const ref = id ? doc(db, colName, id) : doc(collection(db, colName));

    const { id: _, ...data } = item;
    await setDoc(ref, data);
  }
}


  console.log("✅ Importación completada con éxito.");
}

run().catch(err => {
  console.error("❌ Error importando Firestore:", err);
  process.exit(1);
});
