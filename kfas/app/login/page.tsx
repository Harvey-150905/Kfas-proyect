"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

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

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedPassword) {
      setError("Email y contraseña son obligatorios");
      return;
    }

    try {
      const credential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      const uid = credential.user.uid;
      document.cookie = `conecta_auth=${uid}; path=/`;
      router.push("/protected/actividades");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Fondo natural */}
      <img src="/fondo.jpg" alt="Fondo natural" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Contenido */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-xl rounded-[28px] bg-white/95 p-10 shadow-2xl backdrop-blur-sm ring-1 ring-[#e5ede2] sm:p-12">
          <header className="mb-8 flex flex-col items-center gap-3 text-center text-gray-800">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <svg
                aria-hidden
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-emerald-600"
              >
               <path
                  d="
                    M14 36
                    c4 -8 16 -8 20 0
                    m16 0
                    c-4 -8 -16 -8 -20 0
                    m-6 -14
                    a6 6 0 1 1 -12 0
                    6 6 0 0 1 12 0
                    Z
                    m28 0
                    a6 6 0 1 1 -12 0
                    6 6 0 0 1 12 0
                    Z
                    m-14 -4
                    a6 6 0 1 1 -12 0
                    6 6 0 0 1 12 0
                    Z
                  "
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

            <h1 className="text-3xl font-semibold text-gray-900">Conecta Pueblos</h1>
          </header>

          <section className="space-y-6 text-gray-800">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Login</h2>
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <label htmlFor="password">Password</label>
                  <Link href="/reset-password" className="text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="••••••••"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-2xl bg-[#1e6fe3] px-4 py-3 text-base font-semibold text-white shadow-md hover:bg-[#155cc0]"
              >
                Sign in
              </button>

              <div className="mt-4 text-center text-sm">
                ¿No tienes una cuenta?
                <Link href="/register" className="ml-1 font-semibold text-blue-600 hover:underline">
                  Crear cuenta
                </Link>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
