"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const filters = ["Todas", "Actividades", "Comentarios", "Mensajes", "Recordatorios", "Solicitudes"] as const;

type NotificationType = (typeof filters)[number];

type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read?: boolean;
  href?: string;
  group: "Hoy" | "Últimos 7 días" | "Más antiguas";
};

const data: NotificationItem[] = [
  {
    id: "1",
    type: "Actividades",
    title: "Nueva actividad en Prades",
    description: "Se ha creado el taller de cestería tradicional.",
    time: "Hace 2 horas",
    group: "Hoy",
    href: "/actividad/huerto",
  },
  {
    id: "2",
    type: "Mensajes",
    title: "Mensaje nuevo de Marta",
    description: "¿Te apuntas a la caminata del domingo?",
    time: "Hace 3 horas",
    group: "Hoy",
    href: "/mensajes",
  },
  {
    id: "3",
    type: "Comentarios",
    title: "Nuevo comentario en tu publicación",
    description: "Ana comentó: ¡Qué buena iniciativa!",
    time: "Ayer",
    group: "Últimos 7 días",
    read: true,
  },
  {
    id: "4",
    type: "Recordatorios",
    title: "Recordatorio de actividad",
    description: "La ruta por el hayedo comienza mañana a las 07:30",
    time: "Hace 2 días",
    group: "Últimos 7 días",
  },
  {
    id: "5",
    type: "Solicitudes",
    title: "Nueva solicitud de contacto",
    description: "Jordi quiere conectar contigo",
    time: "Hace 1 semana",
    group: "Más antiguas",
    read: true,
  },
];

export default function NotificacionesClient() {
  const [activeFilter, setActiveFilter] = useState<NotificationType>("Todas");
  const [items, setItems] = useState(data);

  const filtered = useMemo(() => {
    if (activeFilter === "Todas") return items;
    return items.filter((item) => item.type === activeFilter);
  }, [activeFilter, items]);

  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, NotificationItem[]>>((acc, item) => {
      acc[item.group] = acc[item.group] ? [...acc[item.group], item] : [item];
      return acc;
    }, {});
  }, [filtered]);

  const markAllAsRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8f4] via-white to-[#edf3eb] pb-16 text-[#1f2d20]">
      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white/80 px-6 py-5 shadow-[0_16px_55px_-38px_rgba(55,84,55,0.4)] ring-1 ring-[#e1eadf] backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#6e8b61]">Centro</p>
            <h1 className="text-3xl font-bold text-[#243625]">Notificaciones</h1>
            <p className="mt-1 text-sm text-[#486049]">Aquí verás las novedades importantes de tus actividades, pueblos y comunidad.</p>
          </div>
          <button
            type="button"
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 rounded-full bg-[#7da987] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Marcar todas como leídas
          </button>
        </header>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter
                  ? "border-transparent bg-[#e8f1e4] text-[#1f2d20] shadow-sm"
                  : "border-[#d9e6d5] bg-white text-[#3c5440] hover:bg-[#f4f8f2]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-6">
          {Object.entries(grouped).map(([groupName, groupItems]) => (
            <div key={groupName} className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#6e8b61]">{groupName}</h2>
              <div className="space-y-3">
                {groupItems.map((notification) => (
                  <NotificationRow key={notification.id} notification={notification} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationRow({ notification }: { notification: NotificationItem }) {
  const icon = iconFor(notification.type);
  const Wrapper = notification.href ? Link : "div";
  const wrapperProps = notification.href ? { href: notification.href } : {};

  return (
    <Wrapper
      {...(wrapperProps as never)}
      className={`group flex items-start gap-3 rounded-2xl border px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-lg ${
        notification.read ? "border-[#e7efe4] bg-white" : "border-[#d7e6d4] bg-[#f5f9f3]"
      }`}
    >
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f1e4] text-[#5f7d53] shadow-inner">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-[#243625]">{notification.title}</p>
          <span className="text-xs font-semibold text-[#5d715f]">{notification.time}</span>
        </div>
        <p className="text-sm text-[#4c624f]">{notification.description}</p>
      </div>
      {!notification.read && <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#88a97b]" aria-hidden />}
    </Wrapper>
  );
}

function iconFor(type: NotificationType) {
  const base = "h-5 w-5";
  switch (type) {
    case "Actividades":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M4 10h16" />
          <path d="M9 3v4" />
          <path d="M15 3v4" />
        </svg>
      );
    case "Comentarios":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 17.5 3 21V6.5A3.5 3.5 0 0 1 6.5 3h11A3.5 3.5 0 0 1 21 6.5v7A3.5 3.5 0 0 1 17.5 17h-9z" />
          <path d="M7.5 9.5h9" />
          <path d="M7.5 13h6" />
        </svg>
      );
    case "Mensajes":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 5.5h15v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2z" />
          <path d="m4.5 8.5 7.5 5 7.5-5" />
        </svg>
      );
    case "Recordatorios":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22a3 3 0 0 0 3-3H9a3 3 0 0 0 3 3Z" />
          <path d="M18 14V9a6 6 0 1 0-12 0v5L4 17h16Z" />
        </svg>
      );
    case "Solicitudes":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 0c-4 0-6.5 2-7 6h14c-.5-4-3-6-7-6Z" />
          <path d="M18.5 8.5 21 11m-2.5-2.5L16 11" />
        </svg>
      );
    default:
      return null;
  }
}
