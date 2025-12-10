import Link from "next/link";
import { getPueblos } from "@/lib/pueblos";

export default async function DescubrirPage() {
  const pueblos = await getPueblos();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8f4] via-white to-[#edf3eb] text-[#1f2d20]">
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6 lg:px-10">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6e8b61]">Descubrir</p>
          <h1 className="text-3xl font-bold text-[#243625]">Explora nuevas comunidades</h1>
          <p className="text-sm text-[#486049]">Navega por los pueblos y salta a sus detalles o actividades.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {pueblos.map((pueblo) => (
            <div key={pueblo.id} className="rounded-2xl border border-[#d9e6d5] bg-white/90 p-5 shadow-[0_16px_55px_-38px_rgba(55,84,55,0.35)]">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#243625]">{pueblo.nombre}</h3>
                <span className="rounded-full bg-[#e8f1e4] px-3 py-1 text-xs font-semibold text-[#2f4332]">{pueblo.distancia_km ?? "–"} km</span>
              </div>
              <p className="mt-2 text-sm text-[#486049] line-clamp-3">{pueblo.descripcion}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={`/pueblo/${pueblo.id}`} className="rounded-full border border-[#d9e6d5] px-3 py-2 text-xs font-semibold text-[#2f4332] transition hover:-translate-y-0.5 hover:shadow-md">
                  Ver pueblo
                </Link>
                <Link href="/actividades" className="rounded-full bg-[#7da987] px-3 py-2 text-xs font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
                  Ver actividades
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard" className="rounded-full border border-[#d9e6d5] px-4 py-2 text-sm font-semibold text-[#2f4332] transition hover:-translate-y-0.5 hover:shadow-md">
            Volver al inicio
          </Link>
          <Link href="/tus-pueblos" className="rounded-full bg-[#7da987] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
            Ir a tus pueblos
          </Link>
        </div>
      </div>
    </div>
  );
}
