"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PublicUser } from "@/lib/users";

type Activity = {
  id: string;
  titulo: string;
  fecha: string;
  estado: "participando" | "pendiente" | "publicada";
  imagen: string;
  ubicacion: string;
};

type ProfileClientProps = {
  user?: PublicUser;
};

const backgroundClass = "bg-gradient-to-br from-[#fbfbfb] via-white to-[#f5f5f5]";

const activityMocks: Activity[] = [
  {
    id: "huertos",
    titulo: "Huertos comunitarios en el valle",
    fecha: "18 de enero · 09:00",
    estado: "participando",
    ubicacion: "Prades, zona verde",
    imagen:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "artesania",
    titulo: "Muestra de artesanía local",
    fecha: "24 de enero · 17:30",
    estado: "publicada",
    ubicacion: "Besalú, centro cultural",
    imagen:
      "https://images.unsplash.com/photo-1523419400524-224f4f05fa5b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "sendero",
    titulo: "Sendero interpretativo por el hayedo",
    fecha: "2 de febrero · 07:15",
    estado: "pendiente",
    ubicacion: "Rupit i Pruit, puente colgante",
    imagen:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  },
];

const sidebarLinks = [
  { label: "Perfil", href: "/perfil", icon: "user" },
  { label: "Configuración", href: "/configuracion", icon: "settings" },
  { label: "Seguridad", href: "/seguridad", icon: "lock" },
  { label: "Notificaciones", href: "/notificaciones", icon: "bell" },
  { label: "Cerrar sesión", href: "/login", icon: "logout" },
];

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
}

function iconFor(name: string) {
  switch (name) {
    case "user":
      return (
        <path
          d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3 0-6 1.6-6 4v1h12v-1c0-2.4-3-4-6-4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "settings":
      return (
        <path
          d="M12 9.5A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm-7 2.5 1.6-.35a6 6 0 0 1 1-1.72l-.95-1.4 1.4-1.4 1.4.95a6 6 0 0 1 1.72-1l.35-1.6h2l.35 1.6a6 6 0 0 1 1.72 1l1.4-.95 1.4 1.4-.95 1.4a6 6 0 0 1 1 1.72l1.6.35v2l-1.6.35a6 6 0 0 1-1 1.72l.95 1.4-1.4 1.4-1.4-.95a6 6 0 0 1-1.72 1l-.35 1.6h-2l-.35-1.6a6 6 0 0 1-1.72-1l-1.4.95-1.4-1.4.95-1.4a6 6 0 0 1-1-1.72L5 14.5Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "lock":
      return (
        <path
          d="M7.5 10.5v-2a4.5 4.5 0 0 1 9 0v2m-9 0h9m-9 0a1.5 1.5 0 0 0-1.5 1.5v5A1.5 1.5 0 0 0 7.5 18.5h9a1.5 1.5 0 0 0 1.5-1.5v-5a1.5 1.5 0 0 0-1.5-1.5m-6 4.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "bell":
      return (
        <path
          d="M8 18a4 4 0 0 0 8 0m-6.5-11a2.5 2.5 0 0 1 5 0c0 2.5 1 3.5 1.8 4.8A1 1 0 0 1 15.5 13h-7a1 1 0 0 1-.8-1.2C8.5 10.5 9.5 9.5 9.5 7Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "logout":
      return (
        <path
          d="M14 17v1.5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 6 18.5v-13A1.5 1.5 0 0 1 7.5 4h5A1.5 1.5 0 0 1 14 5.5V7m2 8 3-3-3-3m3 3H11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    default:
      return null;
  }
}

function statusBadge(estado: Activity["estado"]) {
  const map = {
    participando: { bg: "bg-[#e3f2de]", text: "text-[#2f422a]", label: "Participando" },
    pendiente: { bg: "bg-[#fef6e7]", text: "text-[#8a6225]", label: "Pendiente" },
    publicada: { bg: "bg-[#e7f1fb]", text: "text-[#1f4b82]", label: "Publicada" },
  } as const;

  const style = map[estado];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${style.bg} ${style.text}`}>
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden />
      {style.label}
    </span>
  );
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const displayName = user?.nombre ?? "Tu perfil";
  const initials = initialsFromName(displayName || "CP") || "CP";
  const pueblo = user?.pueblo ?? "Pueblo por confirmar";
  const profileComplete = Boolean(user?.pueblo);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre ?? "",
    email: user?.email ?? "",
    pueblo: user?.pueblo ?? "",
    password: "",
  });

  const stats = useMemo(
    () => [
      { label: "Actividades inscritas", value: 8, iconBg: "bg-[#e6f0dc]", accent: "#6f8c64" },
      { label: "Pueblos que sigues", value: 5, iconBg: "bg-[#e3ede4]", accent: "#4c6b45" },
      { label: "Mensajes activos", value: 12, iconBg: "bg-[#e5f3ed]", accent: "#2f8063" },
    ],
    [],
  );

  const activities = useMemo(() => activityMocks, []);

  return (
    <div className={`relative min-h-screen ${backgroundClass} text-[#2f422a]`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(136,169,123,0.18),_transparent_45%),_radial-gradient(circle_at_80%_10%,_rgba(207,227,196,0.28),_transparent_35%),_radial-gradient(circle_at_50%_70%,_rgba(136,169,123,0.18),_transparent_45%)]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-7 px-4 pb-14 pt-8 sm:px-6 lg:flex-row lg:px-8">
        <aside className="h-fit rounded-3xl border border-[#d6e2cf] bg-white/85 px-5 py-6 shadow-[0_18px_60px_-38px_rgba(55,84,55,0.45)] backdrop-blur lg:sticky lg:top-8 lg:w-64">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#88A97B] to-[#6f8c64] text-white shadow-md">
              <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path
                  d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3 0-6 1.6-6 4v1h12v-1c0-2.4-3-4-6-4Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#6f8c64]">Perfil</p>
              <p className="text-lg font-semibold">Conecta Pueblos</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-[#2f422a] transition hover:-translate-y-0.5 hover:bg-[#e8f0e1] hover:text-[#243728]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef3ea] text-[#5f7d53] shadow-sm">
                  <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    {iconFor(item.icon)}
                  </svg>
                </span>
                <span className="flex-1">{item.label}</span>
                <span aria-hidden className="text-[#88A97B]">›</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex flex-1 flex-col gap-6">
          <section className="relative overflow-hidden rounded-3xl border border-[#d6e2cf] bg-white/90 p-6 shadow-[0_18px_70px_-36px_rgba(68,99,68,0.55)] backdrop-blur-sm sm:p-7">
            <div className="absolute -left-14 -top-8 h-32 w-32 rounded-full bg-[#d9e7d2] blur-3xl" aria-hidden />
            <div className="absolute -right-14 -bottom-14 h-36 w-36 rounded-full bg-[#88A97B]/25 blur-3xl" aria-hidden />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-1 items-center gap-5">
                <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-[#89a67e] to-[#5f7d53] text-2xl font-semibold text-white shadow-lg">
                  <Image src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80" alt={displayName} fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 text-white">{initials}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#6f8c64]">Perfil de la comunidad</p>
                  <h1 className="text-3xl font-bold text-[#243728] sm:text-4xl">{displayName}</h1>
                  <p className="flex items-center gap-2 text-sm font-medium text-[#2f422a]">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#88A97B]" aria-hidden />
                    {pueblo}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditing((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#88A97B] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path
                      d="m5 15.5-1 3.5 3.5-1L17 8.5 14.5 6 5 15.5Zm9-9 2.5 2.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {editing ? "Cerrar edición" : "Editar perfil"}
                </button>
                <Link
                  href="/configuracion"
                  className="inline-flex items-center gap-2 rounded-full border border-[#cddcc6] bg-white/80 px-4 py-2 text-sm font-semibold text-[#2f422a] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#eef3ea]"
                >
                  <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#5f7d53]">
                    <path
                      d="M12 9.5A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm-7 2.5 1.6-.35a6 6 0 0 1 1-1.72l-.95-1.4 1.4-1.4 1.4.95a6 6 0 0 1 1.72-1l.35-1.6h2l.35 1.6a6 6 0 0 1 1.72 1l1.4-.95 1.4 1.4-.95 1.4a6 6 0 0 1 1 1.72l1.6.35v2l-1.6.35a6 6 0 0 1-1 1.72l.95 1.4-1.4 1.4-1.4-.95a6 6 0 0 1-1.72 1l-.35 1.6h-2l-.35-1.6a6 6 0 0 1-1.72-1l-1.4.95-1.4-1.4.95-1.4a6 6 0 0 1-1-1.72L5 14.5Z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Configuración
                </Link>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-[#d6e2cf] bg-white/90 p-5 shadow-[0_18px_70px_-44px_rgba(36,55,40,0.55)]">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#6f8c64]">Información personal</p>
                  <h2 className="text-2xl font-semibold text-[#2f422a]">Tu cuenta</h2>
                </div>
                {!profileComplete && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-[#2f8063] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-white" aria-hidden />
                    Completar perfil
                  </button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[{ label: "Nombre", value: displayName }, { label: "Email", value: user?.email ?? "Sin correo" }].map((field) => (
                  <div key={field.label} className="rounded-2xl border border-[#e6efe0] bg-[#f7faf6] px-4 py-3 text-sm font-semibold text-[#243728] shadow-inner">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#7b9278]">{field.label}</p>
                    <p>{field.value}</p>
                  </div>
                ))}
                {[{ label: "Pueblo", value: pueblo }, { label: "Fecha de registro", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" }) : "Pendiente" }].map((field) => (
                  <div key={field.label} className="rounded-2xl border border-[#e6efe0] bg-[#f7faf6] px-4 py-3 text-sm font-semibold text-[#243728] shadow-inner">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#7b9278]">{field.label}</p>
                    <p>{field.value}</p>
                  </div>
                ))}
                <div className="sm:col-span-2 rounded-2xl border border-[#e6efe0] bg-[#f7faf6] px-4 py-3 text-sm font-semibold text-[#243728] shadow-inner">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#7b9278]">Estado del perfil</p>
                  <div className="mt-1 flex items-center gap-3 text-sm">
                    {profileComplete ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#e6f0dc] px-3 py-1 text-xs font-semibold text-[#2f422a]">
                        <span className="inline-block h-2 w-2 rounded-full bg-[#6f8c64]" aria-hidden />
                        Completo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#fef6e7] px-3 py-1 text-xs font-semibold text-[#8a6225]">
                        <span className="inline-block h-2 w-2 rounded-full bg-[#d5973c]" aria-hidden />
                        Incompleto
                      </span>
                    )}
                    <p className="text-[#3f5c37]">Mantén tus datos actualizados para recomendaciones locales.</p>
                  </div>
                </div>
              </div>

              {editing && (
                <div className="mt-6 rounded-3xl border border-[#d6e2cf] bg-white/90 p-5 shadow-[0_12px_40px_-28px_rgba(36,55,40,0.4)]">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#6f8c64]">Editar</p>
                      <h3 className="text-lg font-semibold text-[#243728]">Actualiza tu información</h3>
                    </div>
                    <span className="rounded-full bg-[#e6f0dc] px-3 py-1 text-xs font-semibold text-[#2f422a]">Borrador</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {["nombre", "email", "pueblo"].map((field) => (
                      <label key={field} className="space-y-1 text-sm font-medium text-[#2f422a]">
                        <span className="text-xs uppercase tracking-[0.16em] text-[#6f8c64]">{field}</span>
                        <input
                          name={field}
                          value={(formData as Record<string, string>)[field]}
                          onChange={(event) => setFormData((prev) => ({ ...prev, [field]: event.target.value }))}
                          className="w-full rounded-2xl border border-[#d6e2cf] bg-white px-4 py-3 text-sm font-semibold text-[#243728] outline-none transition focus:-translate-y-0.5 focus:border-[#88A97B] focus:shadow-[0_12px_32px_-22px_rgba(68,99,68,0.45)]"
                        />
                      </label>
                    ))}
                    <label className="space-y-1 text-sm font-medium text-[#2f422a]">
                      <span className="text-xs uppercase tracking-[0.16em] text-[#6f8c64]">Contraseña</span>
                      <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
                        className="w-full rounded-2xl border border-[#d6e2cf] bg-white px-4 py-3 text-sm font-semibold text-[#243728] outline-none transition focus:-translate-y-0.5 focus:border-[#88A97B] focus:shadow-[0_12px_32px_-22px_rgba(68,99,68,0.45)]"
                      />
                    </label>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full bg-[#88A97B] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      Guardar cambios
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#cddcc6] bg-white/80 px-4 py-2 text-sm font-semibold text-[#2f422a] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#eef3ea]"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-[#d6e2cf] bg-white/90 p-5 shadow-[0_18px_70px_-44px_rgba(36,55,40,0.55)]">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#6f8c64]">Ritmo</p>
                    <h3 className="text-lg font-semibold text-[#243728]">Estadísticas rápidas</h3>
                  </div>
                  <span className="rounded-full bg-[#eef3ea] px-3 py-1 text-xs font-semibold text-[#2f422a]">Últimos 30 días</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col gap-2 rounded-2xl border border-[#e6efe0] bg-[#f9fbf8] p-4 text-[#2f422a] shadow-inner"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${item.iconBg}`} style={{ color: item.accent }}>
                          <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                            <path
                              d="M5 16.5c1.5-1.2 3-2 4.5-2s3 .8 4.5 2m-9-6c1.5-1.2 3-2 4.5-2s3 .8 4.5 2M11.5 6a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Zm7 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Zm-1 5.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <p className="text-[11px] font-semibold uppercase leading-tight tracking-[0.16em] text-[#6f8c64] whitespace-normal">
                          {item.label}
                        </p>
                      </div>
                      <p className="text-3xl font-bold text-[#243728]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#d6e2cf] bg-white/90 p-5 shadow-[0_18px_70px_-44px_rgba(36,55,40,0.55)]">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#6f8c64]">Actividad</p>
                    <h3 className="text-lg font-semibold text-[#243728]">Actividad reciente</h3>
                  </div>
                  <Link
                    href="/actividades"
                    className="text-sm font-semibold text-[#2f8063] underline-offset-4 transition hover:text-[#1f614c]"
                  >
                    Ver historial
                  </Link>
                </div>
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-3 rounded-2xl border border-[#e6efe0] bg-[#f9fbf8] p-3 shadow-inner transition hover:-translate-y-0.5"
                    >
                      <span className="relative h-14 w-14 overflow-hidden rounded-2xl bg-[#e6f0dc]">
                        <Image src={activity.imagen} alt={activity.titulo} fill className="object-cover" />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#243728] line-clamp-2">{activity.titulo}</p>
                        <p className="text-xs text-[#3f5c37]">{activity.fecha} · {activity.ubicacion}</p>
                      </div>
                      {statusBadge(activity.estado)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-[#d6e2cf] bg-white/95 p-6 shadow-[0_20px_80px_-48px_rgba(36,55,40,0.55)]" id="actividades">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#6f8c64]">Actividades</p>
                <h3 className="text-2xl font-semibold text-[#243728]">Tus actividades</h3>
              </div>
              <Link
                href="/actividades"
                className="inline-flex items-center gap-2 rounded-full bg-[#88A97B] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explorar más
              </Link>
            </div>
            {activities.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[#cddcc6] bg-[#f7faf6] p-8 text-center text-[#2f422a] shadow-inner">
                <p className="text-lg font-semibold">Aún no has participado en ninguna actividad.</p>
                <p className="text-sm text-[#3f5c37]">¡Explora comunidades para unirte y compartir!</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {activities.map((activity) => (
                  <article
                    key={activity.id}
                    className="group overflow-hidden rounded-3xl border border-[#e2eadf] bg-white shadow-[0_18px_70px_-48px_rgba(36,55,40,0.55)] transition hover:-translate-y-1 hover:shadow-[0_26px_90px_-52px_rgba(36,55,40,0.6)]"
                  >
                    <div className="relative h-48 w-full">
                      <Image src={activity.imagen} alt={activity.titulo} fill className="object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#2f422a] shadow-sm">
                        <span className="inline-block h-2 w-2 rounded-full bg-[#88A97B]" aria-hidden />
                        {activity.fecha}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 p-5 text-[#243728]">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-xl font-semibold line-clamp-2">{activity.titulo}</h4>
                        {statusBadge(activity.estado)}
                      </div>
                      <p className="flex items-center gap-2 text-sm text-[#3f5c37]">
                        <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#6f8c64]">
                          <path
                            d="M12 21s7-5.3 7-11a7 7 0 0 0-14 0c0 5.7 7 11 7 11Zm0-13.5a2.5 2.5 0 1 1-2.5 2.5A2.5 2.5 0 0 1 12 7.5Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {activity.ubicacion}
                      </p>
                      <div className="flex items-center gap-3 text-sm font-semibold text-[#2f422a]">
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full bg-[#88A97B] px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          Ver detalles
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full border border-[#cddcc6] bg-white px-4 py-2 text-xs font-semibold text-[#2f422a] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#eef3ea]"
                        >
                          Mensajes
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
