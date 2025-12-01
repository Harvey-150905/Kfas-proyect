import Image from "next/image";
import Link from "next/link";

const activities = [
  {
    id: "huerto",
    titulo: "Jornada de huertos comunitarios",
    categoria: "Agro",
    fecha: "Sábado 25 de enero",
    hora: "09:30",
    lugar: "Prades, campo vecinal",
    organizador: "Colectivo Sembrar",
    imagen:
      "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80",
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
    imagen:
      "https://images.unsplash.com/photo-1617032213042-09f3b20c8bd3?auto=format&fit=crop&w=1200&q=80",
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
    imagen:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    descripcion:
      "Caminata temprana para observar aves, compartir desayuno de kilómetro cero y limpiar el sendero.",
  },
];

const pueblosDelUsuario = [
  { id: "prades", nombre: "Prades" },
  { id: "besalu", nombre: "Besalú" },
  { id: "rupit", nombre: "Rupit i Pruit" },
];

const menuPrincipal = [
  { label: "Inicio", href: "/" },
  { label: "Actividades", href: "/actividades" },
  { label: "Mensajes", href: "#mensajes" },
  { label: "Tus pueblos", href: "#tus-pueblos" },
];

export default function ActividadesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff6ec] via-[#e7f0e4] to-[#dbe6d6] text-[#224031]">
      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-10 lg:px-8">
        <aside className="hidden w-64 flex-shrink-0 rounded-3xl bg-white/80 p-6 shadow-[0_30px_80px_-50px_rgba(34,64,49,0.55)] backdrop-blur-lg md:block">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7fb27d] to-[#5e8f66] text-white shadow-lg">
              <svg
                aria-hidden
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
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
              <p className="text-xs uppercase tracking-[0.2em] text-[#6a8a66]">Conecta</p>
              <p className="text-lg font-semibold">Conecta Pueblos</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuPrincipal.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition hover:bg-[#edf5ea] hover:text-[#1f3529]"
              >
                <span>{item.label}</span>
                {item.label === "Actividades" && <span className="rounded-full bg-[#d9efe0] px-3 py-1 text-xs text-[#2e5e3f]">Nuevo</span>}
              </Link>
            ))}
          </nav>

          <div className="mt-10 space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[#7a9a72]">Tus pueblos</p>
            <div className="space-y-2">
              {pueblosDelUsuario.map((pueblo) => (
                <div
                  key={pueblo.id}
                  className="flex items-center justify-between rounded-2xl border border-[#e4efe2] bg-[#f6fbf4] px-4 py-3 text-sm font-medium text-[#274432] shadow-sm"
                >
                  <span>{pueblo.nombre}</span>
                  <span className="h-2 w-2 rounded-full bg-[#6fa077]" aria-hidden />
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          <header className="flex items-center justify-between gap-4 rounded-3xl bg-white/85 px-6 py-4 shadow-[0_25px_80px_-50px_rgba(34,64,49,0.6)] backdrop-blur-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7fb27d] to-[#5e8f66] text-white shadow-lg md:hidden">
                <span className="text-lg font-bold">CP</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#6a8a66]">Conecta Pueblos</p>
                <p className="text-lg font-semibold">Actividades</p>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-[#f5f9f3] px-4 py-2 shadow-inner">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#6a8a66]"
              >
                <path
                  d="m20 20-3.5-3.5m0 0A6.5 6.5 0 1 0 5 11a6.5 6.5 0 0 0 11.5 5.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="search"
                placeholder="¿Qué quieres compartir?"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#7fa07a]"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0f7ee] text-[#2e5e3f] shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                aria-label="Notificaciones"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M12 4a4 4 0 0 0-4 4c0 3.5-1 5-2 6h12c-1-1-2-2.5-2-6a4 4 0 0 0-4-4Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 18a2 2 0 0 0 4 0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6ea874] to-[#4f7f56] text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                aria-label="Perfil"
              >
                <span className="text-sm font-semibold">AC</span>
              </button>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Actividades destacadas</h2>
                <button className="rounded-full bg-[#e8f4e4] px-4 py-2 text-xs font-semibold text-[#2e5e3f] shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                  Crear actividad
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {activities.map((actividad) => (
                  <article
                    key={actividad.id}
                    className="group flex flex-col overflow-hidden rounded-3xl bg-white/90 shadow-[0_25px_90px_-50px_rgba(34,64,49,0.6)] transition hover:-translate-y-1 hover:shadow-[0_30px_110px_-60px_rgba(34,64,49,0.65)]"
                  >
                    <div className="relative h-44 w-full">
                      <Image
                        src={actividad.imagen}
                        alt={actividad.titulo}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                        priority={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1f3529]/60 via-transparent" />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-[#2e5e3f] shadow-md">
                        <span className="inline-block h-2 w-2 rounded-full bg-[#6fa077]" aria-hidden />
                        {actividad.categoria}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-3 px-5 py-4">
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-[0.14em] text-[#6a8a66]">
                          {actividad.fecha} · {actividad.hora}
                        </p>
                        <h3 className="text-lg font-semibold text-[#1f3529]">{actividad.titulo}</h3>
                        <p className="text-sm leading-relaxed text-[#31503b] opacity-90">{actividad.descripcion}</p>
                      </div>

                      <div className="mt-auto flex items-center justify-between rounded-2xl bg-[#f4f9f2] px-4 py-3 text-sm text-[#2b4633]">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6ea874] to-[#4f7f56] text-sm font-semibold text-white shadow-md">
                            {actividad.organizador.slice(0, 2)}
                          </span>
                          <div>
                            <p className="font-semibold">{actividad.organizador}</p>
                            <p className="text-xs text-[#587559]">{actividad.lugar}</p>
                          </div>
                        </div>
                        <button className="rounded-full bg-[#e8f4e4] px-4 py-2 text-xs font-semibold text-[#2e5e3f] transition hover:-translate-y-0.5 hover:shadow-md">
                          Apuntarme
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-3xl bg-white/90 p-5 shadow-[0_25px_90px_-60px_rgba(34,64,49,0.55)]">
                <p className="text-xs uppercase tracking-[0.16em] text-[#6a8a66]">Organiza</p>
                <h3 className="text-lg font-semibold text-[#1f3529]">Comparte tu próxima actividad</h3>
                <p className="mt-2 text-sm text-[#34503b]">
                  Describe tu idea, añade fecha, hora y el pueblo anfitrión. La comunidad podrá sumarse al instante.
                </p>
                <button className="mt-4 w-full rounded-2xl bg-gradient-to-br from-[#7fb27d] to-[#5e8f66] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
                  Crear publicación
                </button>
              </div>

              <div className="rounded-3xl bg-white/90 p-5 shadow-[0_25px_90px_-60px_rgba(34,64,49,0.55)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1f3529]">Recordatorios</h3>
                  <span className="rounded-full bg-[#e8f4e4] px-3 py-1 text-xs font-semibold text-[#2e5e3f]">Esta semana</span>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-[#2b4633]">
                  <li className="flex items-start gap-3 rounded-2xl bg-[#f6fbf4] px-4 py-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#6fa077]" aria-hidden />
                    <div>
                      <p className="font-semibold">Confirmar materiales para el huerto</p>
                      <p className="text-xs text-[#587559]">Viernes 18:00 · Canal Conecta Agro</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 rounded-2xl bg-[#f6fbf4] px-4 py-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#6fa077]" aria-hidden />
                    <div>
                      <p className="font-semibold">Compartir fotos del taller de bordado</p>
                      <p className="text-xs text-[#587559]">Domingo 20:00 · Mensajes</p>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
