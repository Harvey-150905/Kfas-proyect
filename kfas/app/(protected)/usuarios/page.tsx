import { useUsuarios } from "@/hooks/useUsuarios";

export default function UsuariosPage() {
  const { data, loading, error } = useUsuarios();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8f4] via-white to-[#edf3eb] text-[#1f2d20]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-10">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6e8b61]">Usuarios</p>
          <h1 className="text-3xl font-bold text-[#243625]">Panel de usuarios</h1>
          <p className="text-sm text-[#486049]">Listado simple de cuentas registradas.</p>
        </header>

        {loading && <p className="text-sm text-[#486049]">Cargando usuarios...</p>}
        {error && <p className="text-sm text-red-600">Error: {error}</p>}

        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl border border-[#d9e6d5] bg-white/90 shadow-[0_16px_55px_-38px_rgba(55,84,55,0.35)]">
            <div className="grid grid-cols-4 gap-4 bg-[#f3f7f0] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#486049]">
              <span>Nombre</span>
              <span>Email</span>
              <span>Rol</span>
              <span>Fecha</span>
            </div>
            <div className="divide-y divide-[#e6efe0]">
              {data.map((user) => (
                <div key={user.id} className="grid grid-cols-4 gap-4 px-4 py-3 text-sm text-[#1f2d20]">
                  <span className="font-semibold text-[#243625]">{user.nombre}</span>
                  <span className="text-[#3f5c37]">{user.email}</span>
                  <span className="text-[#486049]">{user.rol ?? "usuario"}</span>
                  <span className="text-[#486049]">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
