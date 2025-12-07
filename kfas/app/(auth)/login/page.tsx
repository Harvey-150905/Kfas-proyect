"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

  export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillEmail = useMemo(() => searchParams.get("email") ?? "", [searchParams]);
  const registeredRecently = useMemo(() => searchParams.get("registered") === "1", [searchParams]);
  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload?.error ?? "Error al iniciar sesión");
        return;
      }

      router.push("/actividades");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-xl rounded-[28px] bg-white/95 p-10 shadow-2xl ring-1 ring-[#e5ede2] backdrop-blur-sm sm:p-12">
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
              <h2 className="text-2xl font-semibold text-gray-900">Login</h2>
              {registeredRecently && (
                <p className="mt-2 text-sm font-medium text-emerald-700">Inicia sesión con tu nueva cuenta</p>
              )}
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
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
                <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                  <label htmlFor="password">Password</label>
                  <a className="text-blue-600 transition hover:text-blue-700" href="#">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="••••••••"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-2xl bg-[#1e6fe3] px-4 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#155cc0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e6fe3]"
              >
                Sign in
              </button>

              <div className="mt-4 text-center text-sm text-gray-700">
                ¿No tienes una cuenta?
                <a
                  href="/register"
                  className="ml-1 font-semibold text-blue-600 hover:underline transition"
                >
                  Crear cuenta
                </a>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
