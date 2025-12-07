"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const backgroundUrl =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80";

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

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password, confirmPassword, pueblo }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload?.error ?? "No se pudo crear la cuenta");
        setIsSubmitting(false);
        return;
      }

      setShowSuccess(true);

      setTimeout(() => {
        router.push(`/login?email=${encodeURIComponent(email)}&registered=1`);
      }, 1400);
    } catch (error) {
      setError((error as Error).message);
      setIsSubmitting(false);
    }
    setIsSubmitting(false);
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    router.push(`/login?email=${encodeURIComponent(email)}&registered=1`);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e7f1e7] via-[#f2f7f2] to-white" aria-hidden />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
          aria-hidden
        />
      </div>

      <main className="relative z-10 -mt-16 flex min-h-[70vh] items-center justify-center px-4 pb-14 pt-4 sm:pt-6">
        <div className="w-full max-w-4xl rounded-3xl bg-white/95 p-6 shadow-2xl ring-1 ring-[#e5ede2] backdrop-blur-sm sm:p-8 lg:p-10">
          <header className="mb-6 flex flex-col items-center gap-3 text-center text-gray-800 sm:mb-7">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 shadow-inner">
              <svg
                aria-hidden
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 text-emerald-600"
              >
                <path
                  d="M14 36c4-8 16-8 20 0m16 0c-4-8-16-8-20 0m-6-14a6 6 0 11-12 0 6 6 0 0112 0Zm28 0a6 6 0 11-12 0 6 0 0112 0Zm-14-4a6 6 0 11-12 0 6 6 0 0112 0Z"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 50c1-8 9-12 15-12s14 4 15 12m8 0c-1-8-9-12-15-12"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Conecta Pueblos</h1>
              <p className="mt-2 text-sm text-gray-600">Crea tu cuenta para unirte a la comunidad</p>
            </div>
          </header>

          <section className="space-y-5 text-gray-800">
            <form className="grid gap-4 sm:gap-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  value={nombre}
                  onChange={(event) => setNombre(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="you@example.com"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                    Confirmación de contraseña
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="pueblo">
                  Pueblo donde vives (opcional)
                </label>
                <input
                  id="pueblo"
                  name="pueblo"
                  type="text"
                  value={pueblo}
                  onChange={(event) => setPueblo(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="Ej. Prades"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="space-y-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-[#2e8b57] px-4 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#256f45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e8b57] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
                </button>
                <p className="text-center text-sm text-gray-700">
                  ¿Ya tienes cuenta?{" "}
                  <Link href="/login" className="font-semibold text-emerald-700 underline-offset-4 hover:underline">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </form>
          </section>
        </div>
      </main>

      {showSuccess && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white/95 p-6 text-center shadow-2xl backdrop-blur">
            <h3 className="text-xl font-semibold text-emerald-700">Cuenta creada con éxito</h3>
            <p className="mt-2 text-sm text-gray-700">Redirigiendo para que inicies sesión...</p>
            <button
              type="button"
              onClick={handleCloseModal}
              className="mt-4 w-full rounded-2xl bg-[#2e8b57] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#256f45]"
            >
              Ir al login ahora
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
