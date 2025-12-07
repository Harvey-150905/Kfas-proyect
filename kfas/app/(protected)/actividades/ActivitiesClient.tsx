"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PublicUser } from "@/lib/users";

type Activity = {
  id: string;
  titulo: string;
  categoria: string;
  fecha: string;
  hora: string;
  lugar: string;
  organizador: string;
  avatar: string;
  imagen: string;
  descripcion: string;
};

type ActivitiesClientProps = {
  user?: PublicUser;
};

const activities: Activity[] = [
  {
    id: "huerto",
    titulo: "Jornada de huertos comunitarios",
    categoria: "Agro",
    fecha: "Sábado 25 de enero",
    hora: "09:30",
    lugar: "Prades, campo vecinal",
    organizador: "Colectivo Sembrar",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    imagen:
      "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1600&q=80",
    descripcion:
      "Compartimos semillas locales, herramientas y técnicas regenerativas para preparar los bancales de invierno.",
  },
  {
    id: "bordados",
    titulo: "Taller de bordado tradicional",
    categoria: "Oficios",
    fecha: "Domingo 26 de enero",
    hora: "16:00",
    lugar: "Casa cultural de Besalú",
    organizador: "Asociación Artesanas del Fluvià",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    imagen:
      "https://images.unsplash.com/photo-1617032213042-09f3b20c8bd3?auto=format&fit=crop&w=1600&q=80",
    descripcion:
      "Aprende puntadas ancestrales, simbolismos y cómo documentar los diseños para futuras generaciones.",
  },
  {
    id: "senderismo",
    titulo: "Ruta suave por el hayedo",
    categoria: "Naturaleza",
    fecha: "Miércoles 29 de enero",
    hora: "07:30",
    lugar: "Rupit i Pruit, puente colgante",
    organizador: "Club Camins Blaus",
    avatar: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=200&q=80",
    imagen:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    descripcion:
      "Caminata temprana para observar aves, compartir desayuno de kilómetro cero y limpiar el sendero.",
  },
];

const shortcuts = [
  { label: "Inicio", href: "/actividades", icon: "home" },
  { label: "Descubrir", href: "#descubrir", icon: "sparkles" },
  { label: "Mensajes", href: "#mensajes", icon: "chat" },
  { label: "Tus pueblos", href: "#tus-pueblos", icon: "map" },
];

const pueblosDelUsuario = [
  { id: "prades", nombre: "Prades", miembros: 138 },
  { id: "besalu", nombre: "Besalú", miembros: 92 },
  { id: "rupit", nombre: "Rupit i Pruit", miembros: 76 },
];

function iconFor(name: string) {
  switch (name) {
    case "home":
      return (
        <path
          d="M4 12.5 12 5l8 7.5V20a1 1 0 0 1-1 1h-4.5v-5a2.5 2.5 0 0 0-5 0v5H5a1 1 0 0 1-1-1v-7.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "sparkles":
      return (
        <path
          d="M12 3.5 13.2 8l3.3 1.2L13.2 10.5 12 15l-1.2-4.5-3.3-1.3L10.8 8 12 3.5Zm6.5 10 0.65 2.35L21.5 16l-2.35 0.65L18.5 19l-0.65-2.35L15.5 16l2.35-0.65 0.65-2.35ZM6 12l0.6 2 1.9 0.6L6.6 15.2 6 17 5.4 15.2 3.5 14.6 5.4 14 6 12Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "chat":
      return (
        <path
          d="M6 17.5 3 21V6.5A3.5 3.5 0 0 1 6.5 3h11A3.5 3.5 0 0 1 21 6.5v7A3.5 3.5 0 0 1 17.5 17h-9l-2.5 0.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "map":
      return (
        <path
          d="m9 5.2 6-1.7 5 1.7v11.6l-5-1.7-6 1.7-5-1.7V3.5l5 1.7Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    default:
      return null;
  }
}

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
}

function UserMenu({ user }: { user?: PublicUser }) {
  const [open, setOpen] = useState(false);
  const avatarUrl = (user as { avatarUrl?: string | null } | undefined)?.avatarUrl;
  const displayName = user?.nombre ?? "Tu perfil";
  const initials = initialsFromName(displayName || "CP") || "CP";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-full bg-white/70 px-3 py-1.5 text-sm font-semibold text-[#2d4432] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#89a67e] to-[#5f7d53] text-base text-white shadow-md">
          {avatarUrl ? (
            <Image src={avatarUrl} alt={displayName} fill className="object-cover" />
          ) : (
            initials
          )}
        </span>
        <span className="text-left leading-tight">
          <span className="block text-xs text-[#68836a]">Bienvenida/o</span>
          <span className="font-semibold text-[#243728]">{displayName}</span>
        </span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className={`h-4 w-4 text-[#5f7d53] transition ${open ? "rotate-180" : ""}`}
          fill="none"
        >
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-[#e3ebdf] bg-white shadow-xl ring-1 ring-black/5">
          {["Perfil", "Configuración", "Cerrar sesión"].map((label) => (
            <button
              key={label}
              type="button"
              className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[#2f4332] transition hover:bg-[#f2f6f0]"
            >
              <span>{label}</span>
              <span aria-hidden className="text-[#89a67e]">›</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ActivityCard({ actividad }: { actividad: Activity }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#e2eadf] bg-white shadow-[0_22px_75px_-52px_rgba(36,55,40,0.65)] transition hover:-translate-y-1 hover:shadow-[0_30px_110px_-60px_rgba(36,55,40,0.7)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[4/3]">
        <Image
          src={actividad.imagen}
          alt={actividad.titulo}
          fill
          sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 60vw, 100vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#142118]/75 via-[#111b14]/20 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#2f4332] shadow-md">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#89a67e]" aria-hidden />
          {actividad.categoria}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/90 shadow-md">
            <Image src={actividad.avatar} alt={actividad.organizador} fill className="object-cover" />
          </div>
          <div className="space-y-1.5">
            <p className="text-xs uppercase tracking-[0.16em] text-[#6b8568]">
              {actividad.fecha} · {actividad.hora}
            </p>
            <h3 className="text-xl font-semibold text-[#1f3024] line-clamp-2">{actividad.titulo}</h3>
            <p className="text-sm leading-relaxed text-[#304635] opacity-90 line-clamp-3">{actividad.descripcion}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-[#f3f7f0] px-4 py-3 text-sm text-[#2c3f30] shadow-inner sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#89a67e] to-[#5f7d53] text-sm font-semibold text-white shadow-md">
              {initialsFromName(actividad.organizador)}
            </div>
            <div className="space-y-0.5">
              <p className="font-semibold">{actividad.organizador}</p>
              <p className="text-xs text-[#5b755b]">{actividad.lugar}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full border border-[#cfe0c9] bg-white px-4 py-2 text-xs font-semibold text-[#2f4332] transition hover:-translate-y-0.5 hover:shadow-md">
              Me interesa
            </button>
            <button className="rounded-full bg-gradient-to-r from-[#89a67e] to-[#5f7d53] px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
              Participar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ActivitiesClient({ user }: ActivitiesClientProps) {
  const featured = useMemo(() => activities.slice(0, 2), []);
  const [statusFilter] = useState("Todo");

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#253829]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:px-10 xl:max-w-[1280px] xl:px-12">
        <aside className="hidden w-[280px] shrink-0 space-y-4 lg:block">
          <div className="overflow-hidden rounded-[26px] bg-white/85 p-5 shadow-[0_25px_80px_-60px_rgba(42,74,41,0.55)] backdrop-blur">
            <div className="mb-4 flex items-center gap-3 rounded-2xl bg-[#ecf3e9] px-3 py-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#89a67e] to-[#5f7d53] text-sm font-semibold text-white shadow-md">
                CP
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#6f8b66]">Conecta</p>
                <p className="text-base font-semibold text-[#253829]">Conecta Pueblos</p>
              </div>
            </div>

            <nav className="space-y-1 text-sm font-semibold text-[#304635]">
              {shortcuts.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-[#f0f5ed]"
                >
                  <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-[#5f7d53]" fill="none">
                    {iconFor(item.icon)}
                  </svg>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="overflow-hidden rounded-[26px] bg-white/85 p-5 shadow-[0_25px_80px_-60px_rgba(42,74,41,0.55)] backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#2c3f30]">Tus pueblos</h3>
              <span className="rounded-full bg-[#e3eddf] px-3 py-1 text-xs font-semibold text-[#5f7d53]">Conectados</span>
            </div>
            <div className="space-y-3">
              {pueblosDelUsuario.map((pueblo) => (
                <div
                  key={pueblo.id}
                  className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#f1f6ef] to-[#e6efe2] px-4 py-3 text-sm text-[#2c3f30] shadow-inner"
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold">{pueblo.nombre}</p>
                    <p className="text-xs text-[#5e765d]">{pueblo.miembros} personas cerca</p>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#89a67e]" aria-hidden />
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          <header className="flex flex-col gap-3 rounded-[26px] bg-white/90 px-5 py-4 shadow-[0_25px_90px_-60px_rgba(42,74,41,0.5)] backdrop-blur md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#89a67e] to-[#5f7d53] text-lg font-semibold text-white shadow-md">
                CP
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#6f8b66]">Comunidad</p>
                <p className="text-lg font-semibold text-[#243728]">Actividades & Noticias</p>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3 md:max-w-xl">
              <div className="flex h-11 flex-1 items-center gap-3 rounded-full bg-[#f3f7f0] px-4 shadow-inner">
                <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#6f8b66]">
                  <path
                    d="m20 20-3.5-3.5m0 0a6.5 6.5 0 1 0-11-4 6.5 6.5 0 0 0 11 4Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="Buscar en tu comunidad..."
                  className="w-full bg-transparent text-sm text-[#253829] outline-none placeholder:text-[#7a9474]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#edf3ea] text-[#2f4332] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  aria-label="Notificaciones"
                >
                  <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path
                      d="M12 4.5a4 4 0 0 0-4 4c0 3.3-0.9 4.7-1.8 5.7h11.6c-0.9-1-1.8-2.4-1.8-5.7a4 4 0 0 0-4-4Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10.5 18.5a1.5 1.5 0 0 0 3 0"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#edf3ea] text-[#2f4332] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  aria-label="Mensajes"
                >
                  <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path
                      d="M6 17.5 3 21V6.5A3.5 3.5 0 0 1 6.5 3h11A3.5 3.5 0 0 1 21 6.5v7A3.5 3.5 0 0 1 17.5 17h-9l-2.5 0.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <UserMenu user={user} />
              </div>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.9fr]">
            <div className="space-y-5">
              <div className="flex flex-col gap-3 rounded-[26px] border border-dashed border-[#c8d8c2] bg-white/70 px-5 py-5 text-sm text-[#304635] shadow-[0_10px_50px_-40px_rgba(42,74,41,0.6)]">
                <p className="font-semibold text-[#2c3f30]">Comparte algo con tu gente</p>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-[#5b755b]">
                  <span className="rounded-full bg-[#ecf3e9] px-3 py-1">Anuncio rápido</span>
                  <span className="rounded-full bg-[#ecf3e9] px-3 py-1">Evento</span>
                  <span className="rounded-full bg-[#ecf3e9] px-3 py-1">Voluntariado</span>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-semibold text-[#243728]">Actividades destacadas</h2>
                <button className="rounded-full bg-[#e4eee0] px-4 py-2 text-xs font-semibold text-[#2f4332] transition hover:-translate-y-0.5 hover:shadow-md">
                  Crear actividad
                </button>
              </div>

              <div className="grid gap-5">
                {featured.map((actividad) => (
                  <ActivityCard key={actividad.id} actividad={actividad} />
                ))}
              </div>

              <div className="rounded-[26px] bg-white/90 p-5 shadow-[0_25px_90px_-60px_rgba(42,74,41,0.5)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#243728]">Más planes para ti</h3>
                  <span className="rounded-full bg-[#e3eddf] px-3 py-1 text-xs font-semibold text-[#5f7d53]">{statusFilter}</span>
                </div>
                <div className="mt-4 grid gap-5 sm:grid-cols-1 md:grid-cols-2">
                  {activities.map((actividad) => (
                    <ActivityCard key={`${actividad.id}-extra`} actividad={actividad} />
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="overflow-hidden rounded-[26px] bg-white/92 p-5 shadow-[0_25px_90px_-60px_rgba(42,74,41,0.5)]">
                <p className="text-xs uppercase tracking-[0.16em] text-[#6f8b66]">Organiza</p>
                <h3 className="text-lg font-semibold text-[#243728]">Comparte tu próxima actividad</h3>
                <p className="mt-2 text-sm text-[#304635] leading-relaxed">
                  Describe tu idea, añade fecha, hora y el pueblo anfitrión. La comunidad podrá sumarse al instante.
                </p>
                <button className="mt-4 w-full rounded-full bg-gradient-to-r from-[#89a67e] to-[#5f7d53] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
                  Crear publicación
                </button>
              </div>

              <div className="overflow-hidden rounded-[26px] bg-white/92 p-5 shadow-[0_25px_90px_-60px_rgba(42,74,41,0.5)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#243728]">Recordatorios</h3>
                  <span className="rounded-full bg-[#e3eddf] px-3 py-1 text-xs font-semibold text-[#5f7d53]">Esta semana</span>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-[#304635]">
                  <li className="flex items-start gap-3 rounded-2xl bg-[#f1f6ef] px-4 py-3 shadow-inner">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#89a67e]" aria-hidden />
                    <div className="space-y-1">
                      <p className="font-semibold leading-snug">Confirmar materiales para el huerto</p>
                      <p className="text-xs text-[#5b755b]">Viernes 18:00 · Canal Conecta Agro</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 rounded-2xl bg-[#f1f6ef] px-4 py-3 shadow-inner">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#89a67e]" aria-hidden />
                    <div className="space-y-1">
                      <p className="font-semibold leading-snug">Compartir fotos del taller de bordado</p>
                      <p className="text-xs text-[#5b755b]">Domingo 20:00 · Mensajes</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="overflow-hidden rounded-[26px] bg-gradient-to-br from-[#5f7d53] to-[#89a67e] p-5 text-white shadow-[0_25px_90px_-60px_rgba(42,74,41,0.55)]">
                <p className="text-xs uppercase tracking-[0.2em] text-white/80">Perfil</p>
                <h3 className="mt-2 text-xl font-semibold">Recomendaciones personalizadas</h3>
                <p className="mt-2 text-sm text-white/90">
                  Completa tu perfil y añade una foto para recibir propuestas cercanas y conectar con más vecinas.
                </p>
                <button className="mt-4 w-full rounded-full bg-white/90 px-4 py-3 text-sm font-semibold text-[#2f4332] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
                  Completar perfil
                </button>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
