"use client";

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
    } catch (error) {
      setError((error as Error).message);
      setIsSubmitting(false);
    }
    setIsSubmitting(false);
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    router.push(`/login?email=${encodeURIComponent(email)}`);
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="absolute inset-0 bg-white/5" aria-hidden />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl rounded-[28px] bg-white/90 p-10 shadow-2xl backdrop-blur-sm sm:p-14">
          <header className="mb-8 flex flex-col items-center gap-3 text-center text-gray-800">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <svg
                  aria-hidden
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-emerald-600"
                >
                  <path
                    d="M14 36c4-8 16-8 20 0m16 0c-4-8-16-8-20 0m-6-14a6 6 0 11-12 0 6 6 0 0112 0Zm28 0a6 6 0 11-12 0 6 0 0112 0Zm-14-4a6 6 0 11-12 0 6 0 0112 0Z"
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
              </div>
            </div>
          </header>

          <section className="space-y-6 text-gray-800">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900">Crea tu cuenta</h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
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
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="you@example.com"
                />
              </div>

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
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="••••••••"
                />
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
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Ej. Prades"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-[#1e6fe3] px-4 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#155cc0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e6fe3] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </form>
          </section>
        </div>
      </main>

      {showSuccess && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-gray-800 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                >
                  <path
                    d="M5 13.5 9.5 18 19 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-900">Cuenta creada con éxito</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  Tu cuenta ha sido creada correctamente. Inicia sesión para continuar.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700"
              >
                Ir a login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
