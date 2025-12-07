"use client";

import { useMemo, useState } from "react";
import type React from "react";
import type { PublicUser } from "@/lib/users";

const sections = [
  "Cuenta",
  "Seguridad",
  "Notificaciones",
  "Privacidad",
  "Idioma y región",
  "Preferencias de la interfaz",
  "Sesiones y dispositivos",
  "Datos y exportación",
  "Eliminar cuenta",
];

type Toast = { type: "success" | "error"; message: string } | null;

type ConfiguracionClientProps = {
  user?: PublicUser;
};

export default function ConfiguracionClient({ user }: ConfiguracionClientProps) {
  const [active, setActive] = useState<string>(sections[0]);
  const [toast, setToast] = useState<Toast>(null);

  const userDisplayName = user?.nombre ?? "Tu cuenta";

  const showToast = (payload: Toast) => {
    setToast(payload);
    setTimeout(() => setToast(null), 3200);
  };

  const content = useMemo(() => {
    switch (active) {
      case "Cuenta":
        return <AccountSettings user={user} onSaved={() => showToast({ type: "success", message: "Los datos de tu cuenta se han actualizado correctamente." })} />;
      case "Seguridad":
        return <SecuritySettings onToast={showToast} />;
      case "Notificaciones":
        return <NotificationSettings onToast={showToast} />;
      case "Privacidad":
        return <PrivacySettings />;
      case "Idioma y región":
        return <LanguageRegionSettings onToast={showToast} />;
      case "Preferencias de la interfaz":
        return <InterfacePreferences onToast={showToast} />;
      case "Sesiones y dispositivos":
        return <SessionsDevices />;
      case "Datos y exportación":
        return <DataExport />;
      case "Eliminar cuenta":
        return <DeleteAccount onToast={showToast} />;
      default:
        return null;
    }
  }, [active, user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8f4] via-white to-[#edf3eb] pb-16 text-[#1f2d20]">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white/80 px-6 py-5 shadow-[0_16px_55px_-38px_rgba(55,84,55,0.4)] ring-1 ring-[#e1eadf] backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#6e8b61]">Panel</p>
            <h1 className="text-3xl font-bold text-[#243625] sm:text-4xl">Configuración de {userDisplayName}</h1>
            <p className="mt-1 text-sm text-[#486049]">Ajusta tu cuenta, seguridad y preferencias con un diseño claro.</p>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-[#e8f1e4] px-4 py-2 text-sm font-semibold text-[#2f4a32] shadow-inner">
            <span className="inline-flex h-3 w-3 rounded-full bg-[#88a97b]" aria-hidden />
            Sesión activa
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-3xl bg-white shadow-[0_20px_60px_-48px_rgba(55,84,55,0.45)] ring-1 ring-[#e3ebdf]">
            <nav className="hidden flex-col divide-y divide-[#edf3eb] md:flex">
              {sections.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => setActive(section)}
                  className={`flex items-center justify-between px-5 py-4 text-left text-sm font-semibold transition ${
                    active === section
                      ? "bg-[#e8f1e4] text-[#1f2d20] shadow-inner"
                      : "text-[#3c5440] hover:bg-[#f4f8f2]"
                  }`}
                >
                  {section}
                  <span
                    className={`h-2 w-2 rounded-full ${active === section ? "bg-[#88a97b]" : "bg-transparent ring-1 ring-[#d9e6d5]"}`}
                    aria-hidden
                  />
                </button>
              ))}
            </nav>
            <div className="md:hidden">
              <select
                value={active}
                onChange={(e) => setActive(e.target.value)}
                className="m-4 w-[calc(100%-2rem)] rounded-2xl border border-[#d9e6d5] bg-white px-4 py-3 text-sm font-semibold text-[#243625] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#88a97b]"
              >
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          <section className="space-y-6">{content}</section>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-[#d7e6d4] bg-white px-4 py-3 text-sm shadow-xl shadow-[rgba(55,84,55,0.2)]">
          <div className="flex items-start gap-3">
            <span className={`mt-1 inline-block h-2.5 w-2.5 rounded-full ${toast.type === "success" ? "bg-[#88a97b]" : "bg-[#e88f7b]"}`} aria-hidden />
            <p className="text-[#2f4332]">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ children, title, description }: { children: React.ReactNode; title: string; description?: string }) {
  return (
    <div className="rounded-[24px] border border-[#e2eadf] bg-white p-6 shadow-[0_18px_60px_-46px_rgba(55,84,55,0.35)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[#243625]">{title}</h2>
          {description ? <p className="mt-1 text-sm text-[#4c624f]">{description}</p> : null}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-medium text-[#2f4332]">
      <span className="mb-1 block text-[#4c624f]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#d9e6d5] bg-white px-4 py-3 text-sm text-[#243625] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#88a97b]"
      />
    </label>
  );
}

function Toggle({ label, helper, checked, onChange }: { label: string; helper?: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-[#e7efe4] bg-[#f8fbf6] p-4">
      <div>
        <p className="text-sm font-semibold text-[#243625]">{label}</p>
        {helper ? <p className="text-xs text-[#5d715f]">{helper}</p> : null}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${checked ? "bg-[#88a97b]" : "bg-[#d7e4d1]"}`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transition ${checked ? "translate-x-5" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
}

function AccountSettings({ user, onSaved }: { user?: PublicUser; onSaved: () => void }) {
  const [name, setName] = useState(user?.nombre ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [town, setTown] = useState("Prades");

  return (
    <Card title="Cuenta" description="Actualiza tu información básica.">
      <div className="grid gap-4 md:grid-cols-2">
        <InputField label="Nombre completo" value={name} onChange={setName} placeholder="Escribe tu nombre" />
        <InputField label="Email" value={email} onChange={setEmail} type="email" placeholder="correo@ejemplo.com" />
        <InputField label="Pueblo de residencia" value={town} onChange={setTown} placeholder="Selecciona tu pueblo" />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSaved}
          className="inline-flex items-center gap-2 rounded-full bg-[#7da987] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Guardar cambios
        </button>
      </div>
    </Card>
  );
}

function SecuritySettings({ onToast }: { onToast: (toast: Toast) => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleUpdate = () => {
    const newErrors: string[] = [];
    if (next.length < 8) newErrors.push("La nueva contraseña debe tener al menos 8 caracteres.");
    if (next !== confirm) newErrors.push("La confirmación no coincide.");
    if (current.length === 0) newErrors.push("Ingresa tu contraseña actual.");
    setErrors(newErrors);
    if (newErrors.length === 0) {
      onToast({ type: "success", message: "Contraseña actualizada correctamente." });
      setCurrent("");
      setNext("");
      setConfirm("");
    }
  };

  const activity = [
    { fecha: "Hoy, 09:20", dispositivo: "Chrome en Windows", ubicacion: "Barcelona, España" },
    { fecha: "Ayer, 18:45", dispositivo: "Safari en iPhone", ubicacion: "Girona, España" },
    { fecha: "Martes, 11:10", dispositivo: "Firefox en Linux", ubicacion: "Tarragona, España" },
  ];

  return (
    <div className="space-y-5">
      <Card title="Cambiar contraseña" description="Refuerza la seguridad de tu cuenta">
        <div className="grid gap-4 md:grid-cols-2">
          <InputField label="Contraseña actual" type="password" value={current} onChange={setCurrent} />
          <InputField label="Nueva contraseña" type="password" value={next} onChange={setNext} />
          <InputField label="Confirmar nueva contraseña" type="password" value={confirm} onChange={setConfirm} />
        </div>
        {errors.length > 0 && (
          <div className="rounded-2xl border border-[#f3d8d8] bg-[#fff5f5] p-4 text-sm text-[#7a2f2f]">
            <ul className="list-disc pl-5">
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleUpdate}
            className="inline-flex items-center gap-2 rounded-full bg-[#7da987] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Actualizar contraseña
          </button>
        </div>
      </Card>

      <Card title="Actividad de seguridad" description="Últimos inicios de sesión registrados">
        <div className="space-y-3">
          {activity.map((item) => (
            <div key={item.fecha + item.dispositivo} className="flex items-center justify-between gap-3 rounded-2xl border border-[#e7efe4] bg-[#f8fbf6] px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f1e4] text-[#5f7d53]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Z" />
                    <path d="m8 10 4 4 4-4" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#243625]">{item.dispositivo}</p>
                  <p className="text-xs text-[#5d715f]">{item.ubicacion}</p>
                </div>
              </div>
              <p className="text-xs font-semibold text-[#4c624f]">{item.fecha}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function NotificationSettings({ onToast }: { onToast: (toast: Toast) => void }) {
  const [emailPrefs, setEmailPrefs] = useState({
    actividades: true,
    nuevas: true,
    mensajes: true,
    novedades: false,
  });
  const [inAppPrefs, setInAppPrefs] = useState({
    recordatorios: true,
    comentarios: true,
    seguidores: true,
  });

  const handleSave = () => {
    onToast({ type: "success", message: "Preferencias guardadas" });
  };

  return (
    <Card title="Notificaciones" description="Controla cómo y cuándo te avisamos">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-[#2f4332]">Notificaciones por correo</h3>
          <div className="mt-3 space-y-3">
            <Toggle
              label="Actividades a las que estoy inscrito"
              checked={emailPrefs.actividades}
              onChange={(value) => setEmailPrefs((prev) => ({ ...prev, actividades: value }))}
            />
            <Toggle
              label="Nuevas actividades en mis pueblos"
              checked={emailPrefs.nuevas}
              onChange={(value) => setEmailPrefs((prev) => ({ ...prev, nuevas: value }))}
            />
            <Toggle
              label="Mensajes nuevos"
              checked={emailPrefs.mensajes}
              onChange={(value) => setEmailPrefs((prev) => ({ ...prev, mensajes: value }))}
            />
            <Toggle
              label="Novedades de ConectaPueblos"
              checked={emailPrefs.novedades}
              onChange={(value) => setEmailPrefs((prev) => ({ ...prev, novedades: value }))}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#2f4332]">Notificaciones dentro de la app</h3>
          <div className="mt-3 space-y-3">
            <Toggle
              label="Recordatorios de actividades"
              checked={inAppPrefs.recordatorios}
              onChange={(value) => setInAppPrefs((prev) => ({ ...prev, recordatorios: value }))}
            />
            <Toggle
              label="Comentarios en mis publicaciones"
              checked={inAppPrefs.comentarios}
              onChange={(value) => setInAppPrefs((prev) => ({ ...prev, comentarios: value }))}
            />
            <Toggle
              label="Nuevos seguidores / contactos"
              checked={inAppPrefs.seguidores}
              onChange={(value) => setInAppPrefs((prev) => ({ ...prev, seguidores: value }))}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-full bg-[#7da987] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Guardar preferencias
          </button>
        </div>
      </div>
    </Card>
  );
}

function PrivacySettings() {
  const [visibility, setVisibility] = useState({
    perfil: true,
    pueblo: true,
    mensajes: true,
    actividades: true,
  });

  return (
    <Card title="Visibilidad de tu perfil" description="Controla qué ven los demás usuarios">
      <div className="space-y-3">
        <Toggle
          label="Mostrar mi perfil a otros usuarios"
          helper="Si desactivas esta opción, tu perfil no aparecerá en búsquedas públicas."
          checked={visibility.perfil}
          onChange={(value) => setVisibility((prev) => ({ ...prev, perfil: value }))}
        />
        <Toggle
          label="Mostrar el pueblo donde vivo"
          helper="Esto ayuda a conectar con vecinos cercanos."
          checked={visibility.pueblo}
          onChange={(value) => setVisibility((prev) => ({ ...prev, pueblo: value }))}
        />
        <Toggle
          label="Permitir que otros usuarios me envíen mensajes directos"
          helper="Recibirás solicitudes de contacto de personas interesadas en colaborar."
          checked={visibility.mensajes}
          onChange={(value) => setVisibility((prev) => ({ ...prev, mensajes: value }))}
        />
        <Toggle
          label="Mostrar mis actividades públicas"
          helper="Tus eventos aparecerán en la sección de comunidad."
          checked={visibility.actividades}
          onChange={(value) => setVisibility((prev) => ({ ...prev, actividades: value }))}
        />
      </div>
    </Card>
  );
}

function LanguageRegionSettings({ onToast }: { onToast: (toast: Toast) => void }) {
  const [lang, setLang] = useState("Español (ES)");
  const [tz, setTz] = useState("Europa/Madrid");
  return (
    <Card title="Idioma y región" description="Ajusta cómo se muestran los contenidos">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-[#2f4332]">
          <span className="mb-1 block text-[#4c624f]">Idioma</span>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full rounded-2xl border border-[#d9e6d5] bg-white px-4 py-3 text-sm text-[#243625] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#88a97b]"
          >
            {["Español (ES)", "Català (CAT)", "English (EN)"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-[#2f4332]">
          <span className="mb-1 block text-[#4c624f]">Zona horaria</span>
          <select
            value={tz}
            onChange={(e) => setTz(e.target.value)}
            className="w-full rounded-2xl border border-[#d9e6d5] bg-white px-4 py-3 text-sm text-[#243625] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#88a97b]"
          >
            <option value="Europa/Madrid">Europa/Madrid</option>
          </select>
        </label>
      </div>
      <p className="text-sm text-[#5d715f]">Estos ajustes pueden usarse para adaptar fechas, horarios y el idioma de la interfaz.</p>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onToast({ type: "success", message: "Preferencias de idioma guardadas" })}
          className="inline-flex items-center gap-2 rounded-full bg-[#7da987] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Guardar idioma y región
        </button>
      </div>
    </Card>
  );
}

function InterfacePreferences({ onToast }: { onToast: (toast: Toast) => void }) {
  const [theme, setTheme] = useState("Claro");
  const [fontSize, setFontSize] = useState("Normal");
  const [density, setDensity] = useState("Cómodo");

  return (
    <Card title="Preferencias de la interfaz" description="Personaliza la apariencia de ConectaPueblos">
      <div className="grid gap-4 md:grid-cols-2">
        <SelectField label="Tema" value={theme} onChange={setTheme} options={["Claro", "Oscuro (próximamente)"]} />
        <SelectField label="Tamaño de fuente" value={fontSize} onChange={setFontSize} options={["Pequeño", "Normal", "Grande"]} />
        <SelectField label="Densidad del contenido" value={density} onChange={setDensity} options={["Cómodo", "Compacto"]} />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onToast({ type: "success", message: "Preferencias guardadas" })}
          className="inline-flex items-center gap-2 rounded-full bg-[#7da987] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Guardar cambios
        </button>
      </div>
    </Card>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (val: string) => void; options: string[] }) {
  return (
    <label className="text-sm font-medium text-[#2f4332]">
      <span className="mb-1 block text-[#4c624f]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-[#d9e6d5] bg-white px-4 py-3 text-sm text-[#243625] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#88a97b]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function SessionsDevices() {
  const sessions = [
    { dispositivo: "MacBook Pro", navegador: "Safari", ubicacion: "Barcelona, España", actual: true },
    { dispositivo: "iPhone 14", navegador: "App", ubicacion: "Girona, España", actual: false },
    { dispositivo: "Surface", navegador: "Edge", ubicacion: "Madrid, España", actual: false },
  ];

  return (
    <Card title="Sesiones y dispositivos" description="Gestiona dónde tienes la sesión iniciada">
      <div className="space-y-3">
        {sessions.map((session) => (
          <div key={session.dispositivo} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e7efe4] bg-[#f8fbf6] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f1e4] text-[#5f7d53]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 6A2.5 2.5 0 0 1 6 3.5h12A2.5 2.5 0 0 1 20.5 6v12A2.5 2.5 0 0 1 18 20.5H6A2.5 2.5 0 0 1 3.5 18V6Z" />
                  <path d="M8 17h8" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-[#243625]">{session.dispositivo}</p>
                <p className="text-xs text-[#5d715f]">{session.navegador} · {session.ubicacion}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {session.actual && <span className="rounded-full bg-[#d9e6d5] px-3 py-1 text-xs font-semibold text-[#2f4332]">Actual</span>}
              <button type="button" className="rounded-full border border-[#d7e4d1] px-3 py-2 text-xs font-semibold text-[#2f4332] transition hover:bg-[#eef4eb]">
                Cerrar sesión en este dispositivo
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-[#f2d4d0] px-5 py-3 text-sm font-semibold text-[#7a2f2f] shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Cerrar sesión en todos los dispositivos
        </button>
      </div>
    </Card>
  );
}

function DataExport() {
  return (
    <Card title="Tus datos" description="Solicita una copia de tu información">
      <p className="text-sm text-[#4c624f]">Puedes solicitar una copia de tus datos de ConectaPueblos para revisarlos o guardarlos.</p>
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#2f4332] shadow-inner ring-1 ring-[#d9e6d5] transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Exportar mis datos
        </button>
      </div>
    </Card>
  );
}

function DeleteAccount({ onToast }: { onToast: (toast: Toast) => void }) {
  const [confirm, setConfirm] = useState("");
  const handleDelete = () => {
    if (confirm.trim().toUpperCase() !== "ELIMINAR") {
      onToast({ type: "error", message: "Escribe ELIMINAR para confirmar" });
      return;
    }
    onToast({ type: "success", message: "Solicitud de eliminación registrada" });
    setConfirm("");
  };

  return (
    <div className="rounded-[24px] border border-[#f1d5d3] bg-[#fff7f6] p-6 shadow-[0_18px_60px_-46px_rgba(122,47,47,0.25)]">
      <h2 className="text-lg font-semibold text-[#7a2f2f]">Eliminar cuenta</h2>
      <p className="mt-1 text-sm text-[#8a3a3a]">Esta acción es permanente. Se eliminarán tu perfil, tus actividades creadas y tu historial.</p>
      <div className="mt-4 space-y-3">
       <InputField
  label='Escribe "ELIMINAR" para continuar'
  value={confirm}
  onChange={setConfirm}
/>

        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center gap-2 rounded-full bg-[#f2d4d0] px-5 py-3 text-sm font-semibold text-[#7a2f2f] shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Eliminar mi cuenta
        </button>
      </div>
    </div>
  );
}
