"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const conversations = [
  {
    id: "marta",
    nombre: "Marta Puig",
    preview: "¿Te apuntas a la caminata del domingo?",
    time: "09:20",
    online: true,
  },
  {
    id: "jordi",
    nombre: "Jordi Serra",
    preview: "Genial la actividad de huertos",
    time: "Ayer",
    online: false,
  },
  {
    id: "laura",
    nombre: "Laura Ríos",
    preview: "¿Puedes compartir la receta?",
    time: "Lun",
    online: false,
  },
];

const messagesByConversation: Record<string, { from: "me" | "them"; text: string; time: string }[]> = {
  marta: [
    { from: "them", text: "Hola!", time: "09:00" },
    { from: "them", text: "¿Te apuntas a la caminata del domingo?", time: "09:20" },
    { from: "me", text: "Sí, ¡me encantaría!", time: "09:22" },
  ],
  jordi: [
    { from: "them", text: "Genial la actividad de huertos", time: "Ayer" },
    { from: "me", text: "Gracias por venir", time: "Ayer" },
  ],
  laura: [
    { from: "them", text: "¿Puedes compartir la receta?", time: "Lun" },
    { from: "me", text: "Claro, te la envío ahora", time: "Lun" },
  ],
};

export default function MensajesClient() {
  const [selected, setSelected] = useState<(typeof conversations)[number] | null>(conversations[0]);
  const [input, setInput] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      if (isMobile) {
        setSelected(null);
      } else {
        setSelected((prev) => prev ?? conversations[0]);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [selected]);

  const messages = useMemo(() => (selected ? messagesByConversation[selected.id] ?? [] : []), [selected]);

  const handleSend = () => {
    if (!input.trim()) return;
    if (!selected) return;
    messagesByConversation[selected.id] = [...messages, { from: "me", text: input.trim(), time: "Ahora" }];
    setInput("");
  };

  const showList = !isMobileView || !selected;
  const showChat = !isMobileView || !!selected;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8f4] via-white to-[#edf3eb] pb-10 text-[#1f2d20]">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl flex-col gap-4 px-4 pt-8 sm:px-6 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white/80 px-6 py-5 shadow-[0_16px_55px_-38px_rgba(55,84,55,0.4)] ring-1 ring-[#e1eadf] backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#6e8b61]">Conecta</p>
            <h1 className="text-3xl font-bold text-[#243625]">Mensajes</h1>
            <p className="mt-1 text-sm text-[#486049]">Organiza tus conversaciones en un espacio cuidado y claro.</p>
          </div>
        </header>

        <div className="grid flex-1 gap-4 rounded-3xl bg-white/80 p-3 shadow-[0_18px_60px_-46px_rgba(55,84,55,0.35)] ring-1 ring-[#e2eadf] md:grid-cols-[340px_1fr]">
          {showList && (
            <div className="flex flex-col gap-3 rounded-2xl bg-[#f7faf5] p-3 ring-1 ring-[#e3ebdf]">
              <div className="flex items-center justify-between gap-2 px-2">
                <h2 className="text-sm font-semibold text-[#2f4332]">Conversaciones</h2>
                <span className="rounded-full bg-[#e8f1e4] px-3 py-1 text-xs font-semibold text-[#2f4332]">{conversations.length} chats</span>
              </div>
              <input
                type="search"
                placeholder="Buscar conversaciones..."
                className="w-full rounded-2xl border border-[#d9e6d5] bg-white px-4 py-2.5 text-sm text-[#243625] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#88a97b]"
              />
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    type="button"
                    onClick={() => setSelected(conversation)}
                    className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                      selected.id === conversation.id
                        ? "border-transparent bg-white shadow-md shadow-[rgba(55,84,55,0.18)]"
                        : "border-[#e1eadf] bg-white/60 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#89a67e] to-[#5f7d53] text-sm font-semibold text-white shadow-md">
                        {conversation.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#243625]">{conversation.nombre}</p>
                        <p className="text-xs text-[#5d715f]">{conversation.preview}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-xs font-semibold text-[#4c624f]">
                      <span>{conversation.time}</span>
                      {conversation.online && <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f0dc] px-2 py-1 text-[10px] text-[#2f4332]">En línea</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showChat && (
            <div className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[#e3ebdf]">
              <div className="flex items-center justify-between gap-3 border-b border-[#edf3eb] px-4 py-3">
                {isMobileView && (
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="rounded-full bg-[#e8f1e4] px-3 py-2 text-xs font-semibold text-[#2f4332]"
                  >
                    Volver
                  </button>
                )}
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#89a67e] to-[#5f7d53] text-sm font-semibold text-white shadow-md">
                    {selected.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#243625]">{selected.nombre}</p>
                    <p className="text-xs text-[#5d715f]">{selected.online ? "En línea" : "Última vez hace 10 min"}</p>
                  </div>
                </div>
              </div>

              <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-[#f7faf5] via-white to-[#f7faf5] px-4 py-4">
                {messages.map((message, idx) => (
                  <div key={idx} className={`flex ${message.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow ${
                        message.from === "me"
                          ? "rounded-br-none bg-[#88a97b] text-white shadow-[0_10px_40px_-24px_rgba(68,99,68,0.5)]"
                          : "rounded-bl-none bg-white text-[#2f4332] ring-1 ring-[#e1eadf]"
                      }`}
                    >
                      <p>{message.text}</p>
                      <span
                        className={`mt-1 block text-[10px] font-semibold md:text-[11px] ${
                          message.from === "me" ? "text-white/80" : "text-[#5d715f]"
                        }`}
                      >
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 border-t border-[#edf3eb] bg-white px-4 py-3">
                <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f1e4] text-[#5f7d53] shadow-inner">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z" />
                    <path d="M7 10h10M7 14h6" />
                  </svg>
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="h-12 flex-1 resize-none rounded-2xl border border-[#d9e6d5] bg-[#f8fbf6] px-4 py-2 text-sm text-[#243625] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#88a97b]"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  className="flex h-12 items-center justify-center rounded-2xl bg-[#7da987] px-4 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3.5 4.5 17 7-17 7L7 12Z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
