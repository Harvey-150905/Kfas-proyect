import Link from "next/link";
import { getPuebloById } from "@/lib/pueblos";

type PuebloPageProps = { params: { id: string } };

export default async function PuebloPage({ params }: PuebloPageProps) {
  const pueblo = await getPuebloById(params.id);

  if (!pueblo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f6f8f4] via-white to-[#edf3eb] text-[#1f2d20]">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-10">
          <h1 className="text-2xl font-bold text-[#243625]">Pueblo no encontrado</h1>
          <p className="mt-2 text-sm text-[#486049]">No pudimos localizar esta comunidad.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/tus-pueblos" className="rounded-full border border-[#d9e6d5] px-4 py-2 text-sm font-semibold text-[#2f4332] transition hover:-translate-y-0.5 hover:shadow-md">
              Volver a tus pueblos
            </Link>
            <Link href="/descubrir" className="rounded-full bg-[#7da987] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
              Ir a descubrir
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8f4] via-white to-[#edf3eb] text-[#1f2d20]">
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6 lg:px-10">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6e8b61]">Pueblo</p>
          <h1 className="text-3xl font-bold text-[#243625]">{pueblo.nombre}</h1>
          <p className="text-sm text-[#486049]">{pueblo.descripcion}</p>
        </header>

        <div className="rounded-2xl border border-[#d9e6d5] bg-white/90 p-5 shadow-[0_16px_55px_-38px_rgba(55,84,55,0.35)]">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-[#6e8b61]">Coordenadas</dt>
              <dd className="text-lg font-semibold text-[#243625]">
                {pueblo.latitud.toFixed(3)} / {pueblo.longitud.toFixed(3)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-[#6e8b61]">Creado</dt>
              <dd className="text-lg font-semibold text-[#243625]">
                {new Date(pueblo.fecha_creacion).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/tus-pueblos" className="rounded-full border border-[#d9e6d5] px-4 py-2 text-sm font-semibold text-[#2f4332] transition hover:-translate-y-0.5 hover:shadow-md">
            Volver a tus pueblos
          </Link>
          <Link href="/actividades" className="rounded-full bg-[#7da987] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
            Ver actividades
          </Link>
        </div>
      </div>
    </div>
  );
}
