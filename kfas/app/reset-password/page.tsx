import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8f4] via-white to-[#edf3eb] text-[#1f2d20]">
      <div className="mx-auto max-w-xl space-y-6 px-4 py-12 sm:px-6 lg:px-10">
        <header className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6e8b61]">Seguridad</p>
          <h1 className="text-3xl font-bold text-[#243625]">Recupera tu acceso</h1>
          <p className="text-sm text-[#486049]">Ingresa tu correo y te enviaremos las instrucciones.</p>
        </header>

        <form className="space-y-4 rounded-2xl border border-[#d9e6d5] bg-white/90 p-6 shadow-[0_16px_55px_-38px_rgba(55,84,55,0.35)]">
          <label className="text-sm font-semibold text-[#2f4332]">
            Correo electronico
            <input className="mt-2 w-full rounded-2xl border border-[#d9e6d5] px-4 py-3 text-sm text-[#243625] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#88a97b]" />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-[#7da987] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Enviar instrucciones
          </button>
        </form>

        <div className="flex justify-center gap-4 text-sm font-semibold">
          <Link href="/login" className="text-[#2f4332] underline-offset-4 hover:underline">
            Volver al login
          </Link>
          <Link href="/register" className="text-[#2f4332] underline-offset-4 hover:underline">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
