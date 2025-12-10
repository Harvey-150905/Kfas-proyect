"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function RegisterPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pueblo, setPueblo] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsSubmitting(false);
      return;
    }
    if (!trimmedEmail || !trimmedPassword || !nombre.trim()) {
      setError("Nombre, email y contraseña son obligatorios");
      setIsSubmitting(false);
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      const uid = cred.user.uid;
      await setDoc(doc(db, "usuarios", uid), {
        nombre,
        email: trimmedEmail.toLowerCase(),
        rol: "usuario",
        pueblo: pueblo || null,
        createdAt: serverTimestamp(),
      });

      setShowSuccess(true);

      setTimeout(() => {
        router.push("/protected/actividades");
      }, 800);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Fondo natural */}
      <img src="/fondo.jpg" alt="Fondo natural" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/30" />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-xl rounded-[28px] bg-white/95 p-8 shadow-2xl backdrop-blur-sm ring-1 ring-[#e5ede2] sm:p-10">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Conecta Pueblos</h1>
            <p className="mt-1 text-sm text-gray-700">Crea tu cuenta para unirte a la comunidad</p>
          </header>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="nombre">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Tu nombre"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="you@example.com"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="confirmPassword">
                  Confirmación de contraseña
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="pueblo">
                Pueblo donde vives (opcional)
              </label>
              <input
                id="pueblo"
                type="text"
                value={pueblo}
                onChange={(e) => setPueblo(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Ej. Prades"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-2xl bg-[#2e8b57] px-4 py-3 text-white font-semibold shadow-md hover:bg-[#256f45] disabled:opacity-70"
            >
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </button>

            <p className="mt-2 text-center text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="font-semibold text-emerald-700 hover:underline">
                Inicia sesión
              </Link>
            </p>
          </form>

          {showSuccess && (
            <div className="absolute inset-0 flex items-center justify-center rounded-[28px] bg-black/40 backdrop-blur-sm">
              <div className="w-full max-w-sm rounded-2xl bg-white/95 p-6 text-center shadow-xl">
                <h3 className="text-xl font-semibold text-emerald-700">Cuenta creada con éxito</h3>
                <p className="mt-2 text-sm text-gray-700">Redirigiendo para iniciar sesión...</p>

                <button
                  type="button"
                  onClick={() => router.push("/protected/actividades")}
                  className="mt-4 w-full rounded-2xl bg-[#2e8b57] py-3 text-sm font-semibold text-white hover:bg-[#256f45]"
                >
                  Ir a actividades
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
