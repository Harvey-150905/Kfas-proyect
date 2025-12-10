"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePueblos } from "../../hooks/usePueblos";
import type { Pueblo } from "../../lib/pueblos";

const backgroundClass = "bg-gradient-to-b from-[#fbfbfb] via-white to-[#f5f5f5]";

function formatDistance(pueblo: Pueblo) {
  if (pueblo.distancia_km === null || pueblo.distancia_km === undefined) return "Distancia no disponible";
  return `${pueblo.distancia_km} km`;
}

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(136,169,123,0.16),_transparent_42%),_radial-gradient(circle_at_80%_12%,_rgba(207,227,196,0.25),_transparent_34%),_radial-gradient(circle_at_50%_70%,_rgba(136,169,123,0.12),_transparent_42%)]" />
      <svg
        className="absolute -bottom-16 right-[-120px] h-[320px] w-[520px] opacity-45"
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 300C50 260 110 250 170 270C230 290 260 310 320 290C380 270 440 200 500 210C560 220 590 280 600 300V400H0V300Z"
          fill="#CFE3C4"
        />
        <path
          d="M0 280C70 250 120 230 200 250C280 270 330 320 400 300C470 280 520 210 600 220V400H0V280Z"
          fill="#AFC8A5"
        />
        <path
          d="M0 320C60 300 120 300 180 320C240 340 300 380 360 360C420 340 480 270 540 270C570 270 590 280 600 290V400H0V320Z"
          fill="#88A97B"
        />
      </svg>
    </div>
  );
}

function PuebloCard({ pueblo }: { pueblo: Pueblo }) {
  return (
    <Link href={`/pueblo/${pueblo.id}`} className="group block">
      <article className="flex flex-col overflow-hidden rounded-[22px] border border-[#d6e2cf] bg-white/90 shadow-[0_18px_60px_-38px_rgba(55,84,55,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_90px_-44px_rgba(55,84,55,0.52)]">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={pueblo.imagen_url}
            alt={pueblo.nombre}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-[#3f5c37] shadow-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-[#88A97B]" aria-hidden />
            {formatDistance(pueblo)}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-[#2f422a]">{pueblo.nombre}</h3>
            <span className="text-xs uppercase tracking-wide text-[#88A97B]">desde {new Date(pueblo.fecha_creacion).getFullYear()}</span>
          </div>
          <p className="text-sm leading-relaxed text-[#3f5c37] opacity-90 line-clamp-3">{pueblo.descripcion}</p>
          <div className="mt-auto flex items-center justify-between text-sm text-[#2f422a]">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e6f0dc] px-3 py-1 font-medium">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#88A97B]" aria-hidden />
              Coordenadas
            </span>
            <span className="font-semibold text-[#446347]">{pueblo.latitud.toFixed(3)} / {pueblo.longitud.toFixed(3)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: pueblos, loading, error } = usePueblos();

  const handleJoin = () => {
    const hasSession = document.cookie.includes("conecta_auth=");
    if (hasSession) {
      router.push("/actividades");
      return;
    }
    router.push("/register");
  };

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="rounded-3xl border border-dashed border-[#b7c8b0] bg-white/70 p-8 text-center text-[#446347]">
          Cargando pueblos...
        </div>
      );
    }

    if (error) {
      return (
        <div className="rounded-3xl border border-[#f3d5d5] bg-[#fff8f6] p-8 text-center text-[#7a2f2f]">
          {error}
        </div>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {pueblos.map((pueblo) => (
          <PuebloCard key={pueblo.id} pueblo={pueblo} />
        ))}
      </div>
    );
  }, [error, loading, pueblos]);

  return (
    <div className={`relative min-h-screen ${backgroundClass} text-[#2f422a]`}>
      <HeroBackground />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col px-4 pb-16 pt-8 sm:px-6 lg:px-10 xl:px-12 min-w-0">
        <header className="mb-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/90 px-5 py-4 shadow-[0_15px_50px_-34px_rgba(68,99,68,0.45)] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#88A97B] to-[#6f8c64] text-white shadow-md">
              <svg
                aria-hidden
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
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
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#6f8c64]">Conecta</p>
              <p className="text-xl font-semibold">Conecta Pueblos</p>
            </div>
          </div>

          <nav className="flex flex-1 items-center justify-center gap-4 text-sm font-medium text-[#3f5c37] sm:gap-6">
            {[
              { href: "/dashboard", label: "Inicio" },
              { href: "/tus-pueblos", label: "Pueblos" },
              { href: "/actividades", label: "Conecta" },
              { href: "/perfil", label: "Nosotros" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-3 py-2 transition hover:bg-[#e8f0e1] hover:text-[#274121]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleJoin}
            className="inline-flex items-center gap-2 rounded-full bg-[#88A97B] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Únete
          </button>
        </header>

        <main className="flex flex-col gap-8 sm:gap-10">
          <section className="relative overflow-hidden rounded-3xl bg-white/95 p-7 shadow-[0_18px_70px_-44px_rgba(68,99,68,0.4)] ring-1 ring-[#e4ecdf] backdrop-blur-sm sm:p-9">
            <div className="absolute -left-12 top-8 h-24 w-24 rounded-full bg-[#d9e7d2] blur-3xl" aria-hidden />
            <div className="absolute -right-14 -bottom-12 h-32 w-32 rounded-full bg-[#88A97B]/30 blur-3xl" aria-hidden />
            <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.75fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.24em] text-[#6f8c64]">Comunidad viva</p>
                <h1 className="text-4xl font-bold leading-tight text-[#2f422a] sm:text-5xl">
                  Conectamos pueblos, compartimos raíces
                </h1>
                <p className="max-w-2xl text-lg text-[#3f5c37] opacity-90">
                  Descubre comunidades rurales en Cataluña, comparte oficios, iniciativas y experiencias que mantienen vivas las tradiciones.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/descubrir"
                    className="inline-flex items-center gap-2 rounded-full bg-[#88A97B] px-5 py-3 text-base font-semibold text-white shadow-lg shadow-[rgba(68,99,68,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_rgba(68,99,68,0.6)]"
                  >
                    Explora comunidades
                  </Link>
                  <Link
                    href="/actividades"
                    className="inline-flex items-center gap-2 rounded-full border border-[#b5c9a8] bg-white/80 px-5 py-3 text-base font-semibold text-[#2f422a] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    Cómo funciona
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-8 -top-6 h-24 w-24 rounded-full bg-[#e5f0db] blur-2xl" aria-hidden />
                <div className="absolute -right-10 bottom-6 h-28 w-28 rounded-full bg-[#cfe3c4] blur-2xl" aria-hidden />
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#e5f1dd] to-[#cfe3c4] p-8 shadow-lg">
                  <div className="rounded-2xl border border-white/70 bg-white/80 p-6 text-[#2f422a] shadow-inner">
                    <p className="text-sm font-semibold text-[#3f5c37]">Mapa de conexiones</p>
                    <p className="mt-2 text-sm text-[#446347] opacity-80">
                      Visualiza las rutas y oportunidades que enlazan cada pueblo con nuevos proyectos comunitarios.
                    </p>
                    <div className="mt-6 h-40 rounded-xl bg-[radial-gradient(circle_at_30%_40%,#88A97B_0%,#88A97B_25%,#d8e7cf_55%,transparent_70%),_radial-gradient(circle_at_70%_60%,#6f8c64_0%,#6f8c64_18%,#cfe3c4_50%,transparent_70%)]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="pueblos" className="space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#6f8c64]">Pueblos</p>
                <h2 className="text-3xl font-semibold text-[#243728] leading-tight">Explora comunidades activas</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-medium text-[#446347] shadow-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-[#88A97B]" aria-hidden />
                Datos conectados en tiempo real
              </div>
            </div>
            <div className="lg:pl-2 xl:pl-4">{content}</div>
          </section>
        </main>
      </div>
    </div>
  );
}

