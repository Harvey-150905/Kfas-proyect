"use client";

import { FormEvent, useState } from "react";

const backgroundUrl =
  "https://images.unsplash.com/photo-1582719478248-54e9f2afbcf0?auto=format&fit=crop&w=1900&q=80";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // In a real scenario this would call an auth endpoint.
    console.info("Submitting Conecta Pueblos login", { email, passwordPresent: Boolean(password) });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-sky-900/55" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(125,211,252,0.25),_transparent_40%)]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(14,165,233,0.12),_transparent_40%)]" aria-hidden />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl rounded-[28px] border border-white/25 bg-white/10 p-8 shadow-[0_20px_60px_-25px_rgba(56,189,248,0.45)] backdrop-blur-2xl ring-1 ring-white/10 transition-transform duration-300 ease-out hover:translate-y-[-2px] sm:p-12">
          <header className="mb-8 flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/15 shadow-inner">
                <svg
                  aria-hidden
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-white"
                >
                  <path
                    d="M14 36c4-8 16-8 20 0m16 0c-4-8-16-8-20 0m-6-14a6 6 0 11-12 0 6 6 0 0112 0Zm28 0a6 6 0 11-12 0 6 6 0 0112 0Zm-14-4a6 6 0 11-12 0 6 6 0 0112 0Z"
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
              <div className="text-left">
                <p className="text-sm uppercase tracking-[0.2em] text-white/70">Conecta</p>
                <h1 className="text-2xl font-semibold leading-6 md:text-3xl">Conecta Pueblos</h1>
              </div>
            </div>
            <p className="max-w-md text-sm text-white/75">
              Conecta con la esencia de los pueblos rurales. Inicia sesión para colaborar y descubrir oportunidades locales.
            </p>
          </header>

          <section className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-6 shadow-[0_10px_35px_-18px_rgba(59,130,246,0.65)] backdrop-blur-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-white/60">acceso</p>
                <h2 className="text-2xl font-semibold">Login</h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/65">
                <span className="h-2 w-2 rounded-full bg-emerald-300" aria-hidden />
                Seguro y cifrado
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm text-white/80" htmlFor="email">
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
                  className="w-full rounded-xl border border-white/25 bg-white/15 px-4 py-3 text-base text-white placeholder:text-white/60 shadow-inner outline-none transition focus:border-white/70 focus:ring-2 focus:ring-sky-300/70"
                  placeholder="tu@email.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <label htmlFor="password">Password</label>
                  <a className="font-medium text-sky-200 transition hover:text-white" href="#">
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
                  className="w-full rounded-xl border border-white/25 bg-white/15 px-4 py-3 text-base text-white placeholder:text-white/60 shadow-inner outline-none transition focus:border-white/70 focus:ring-2 focus:ring-sky-300/70"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-sky-900/35 transition hover:translate-y-[-2px] hover:shadow-xl hover:shadow-sky-900/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-0"
              >
                Sign in
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
