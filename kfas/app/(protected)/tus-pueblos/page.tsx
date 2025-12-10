import Link from "next/link";
import { getPueblos } from "@/lib/pueblos";

export default async function TusPueblosPage() {
  const pueblos = await getPueblos();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8f4] via-white to-[#edf3eb] text-[#1f2d20]">
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6e8b61]">Comunidad</p>
            <h1 className="text-3xl font-bold text-[#243625]">Tus pueblos conectados</h1>
            <p className="text-sm text-[#486049]">Explora las comunidades que sigues y entra a sus detalles.</p>
          </div>
          <Link
            href="/crear-actividad"
            className="inline-flex items-center gap-2 rounded-full bg-[#7da987] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Crear actividad
          </Link>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {pueblos.map((pueblo) => (
            <Link
              key={pueblo.id}
              href={`/pueblo/${pueblo.id}`}
              className="block rounded-2xl border border-[#d9e6d5] bg-white/90 p-5 text-[#1f2d20] shadow-[0_16px_55px_-38px_rgba(55,84,55,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_80px_-46px_rgba(55,84,55,0.4)]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-[#243625]">{pueblo.nombre}</h3>
                <span className="rounded-full bg-[#e8f1e4] px-3 py-1 text-xs font-semibold text-[#2f4332]">Ver detalle</span>
              </div>
              <p className="mt-2 text-sm text-[#486049] line-clamp-3">{pueblo.descripcion}</p>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-full border border-[#d9e6d5] px-4 py-2 text-sm font-semibold text-[#2f4332] transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Volver al inicio
          </Link>
          <Link
            href="/actividades"
            className="rounded-full bg-[#7da987] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Ir a actividades
          </Link>
        </div>
      </div>
    </div>
  );
}
