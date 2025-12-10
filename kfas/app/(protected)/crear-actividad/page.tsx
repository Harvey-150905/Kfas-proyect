import Link from "next/link";

export default function CrearActividadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8f4] via-white to-[#edf3eb] text-[#1f2d20]">
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6 lg:px-10">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6e8b61]">Organiza</p>
          <h1 className="text-3xl font-bold text-[#243625]">Crear actividad</h1>
          <p className="text-sm text-[#486049]">Comparte los detalles de tu plan para que la comunidad pueda sumarse.</p>
        </header>

        <div className="rounded-2xl border border-[#d9e6d5] bg-white/90 p-6 shadow-[0_16px_55px_-38px_rgba(55,84,55,0.35)] space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[#2f4332]">
              Titulo
              <input className="mt-1 w-full rounded-2xl border border-[#d9e6d5] px-4 py-3 text-sm text-[#243625] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#88a97b]" />
            </label>
            <label className="text-sm font-semibold text-[#2f4332]">
              Lugar
              <input className="mt-1 w-full rounded-2xl border border-[#d9e6d5] px-4 py-3 text-sm text-[#243625] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#88a97b]" />
            </label>
          </div>
          <label className="text-sm font-semibold text-[#2f4332]">
            Descripcion
            <textarea className="mt-1 h-32 w-full rounded-2xl border border-[#d9e6d5] px-4 py-3 text-sm text-[#243625] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#88a97b]" />
          </label>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/actividades"
              className="rounded-full bg-[#7da987] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Publicar
            </Link>
            <Link
              href="/publicar"
              className="rounded-full border border-[#d9e6d5] px-4 py-2 text-sm font-semibold text-[#2f4332] transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Compartir rapido
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/actividades" className="rounded-full border border-[#d9e6d5] px-4 py-2 text-sm font-semibold text-[#2f4332] transition hover:-translate-y-0.5 hover:shadow-md">
            Volver a actividades
          </Link>
          <Link href="/dashboard" className="rounded-full bg-[#7da987] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
            Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
