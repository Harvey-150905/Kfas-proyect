import Link from "next/link";

type ActividadPageProps = {
  params: { id: string };
};

export default function ActividadPage({ params }: ActividadPageProps) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8f4] via-white to-[#edf3eb] text-[#1f2d20]">
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6 lg:px-10">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6e8b61]">Actividad</p>
          <h1 className="text-3xl font-bold text-[#243625]">Detalle de actividad</h1>
          <p className="text-sm text-[#486049]">ID: {id}</p>
        </header>

        <div className="rounded-2xl border border-[#d9e6d5] bg-white/90 p-6 shadow-[0_16px_55px_-38px_rgba(55,84,55,0.35)] space-y-4">
          <p className="text-sm text-[#243625]">
            Completa esta vista con la informacion real de la actividad. Usa esta ruta para mostrar el detalle, los asistentes y las acciones disponibles.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/actividades" className="rounded-full border border-[#d9e6d5] px-4 py-2 text-sm font-semibold text-[#2f4332] transition hover:-translate-y-0.5 hover:shadow-md">
            Volver a actividades
          </Link>
          <Link href="/mensajes" className="rounded-full bg-[#7da987] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
            Ir a mensajes
          </Link>
        </div>
      </div>
    </div>
  );
}
