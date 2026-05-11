import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FRIEND_ICONS } from "./situations";
import { sfx } from "./sounds";

export function PhaseGallery({ onRestart }: { onRestart: () => void }) {
  const [picked, setPicked] = useState<string[]>([]);

  function toggle(id: string) {
    sfx.pickup();
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center gap-10 px-6 py-16">
      <div className="rounded-3xl bg-paper/90 px-8 py-6 text-center shadow-paper backdrop-blur paper-texture">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-kraft-dark">
          Fase 3 · Mi círculo verde
        </p>
        <h2 className="text-balance text-4xl font-bold text-foreground md:text-5xl">
          Lo que más me gusta de mis amigos
        </h2>
        <p className="mt-3 text-foreground">
          Toca los iconos que describen a tus personas favoritas. Llenarás tu propio círculo de respeto.
        </p>
      </div>

      {/* Green circle canvas */}
      <div
        className="relative grid aspect-square w-full max-w-md place-items-center rounded-full border-[14px] border-traffic-green bg-paper paper-texture shadow-card-paper"
        style={{ boxShadow: "0 0 60px -10px var(--traffic-green), var(--shadow-card)" }}
      >
        {picked.length === 0 ? (
          <p className="px-10 text-center text-foreground/60">
            Tu círculo está esperando… elige debajo lo que más amas de tus amigos.
          </p>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3 p-10">
            {picked.map((id) => {
              const item = FRIEND_ICONS.find((f) => f.id === id)!;
              return (
                <span
                  key={id}
                  className="rounded-2xl bg-paper px-3 py-2 text-3xl shadow-paper"
                  style={{ animation: "pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}
                  title={item.label}
                >
                  {item.emoji}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Picker */}
      <div className="grid w-full grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {FRIEND_ICONS.map((f) => {
          const on = picked.includes(f.id);
          return (
            <button
              key={f.id}
              onClick={() => toggle(f.id)}
              className={`flex flex-col items-center gap-1 rounded-2xl border-4 p-3 transition-all ${
                on
                  ? "scale-105 border-traffic-green bg-paper shadow-card-paper"
                  : "border-kraft/40 bg-paper/80 shadow-paper hover:scale-105"
              }`}
            >
              <span className="text-3xl">{f.emoji}</span>
              <span className="text-xs font-semibold text-foreground/80">{f.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full border-2 border-kraft-dark/40 bg-paper px-8 py-6 text-base font-bold hover:scale-105"
          onClick={() => {
            sfx.click();
            onRestart();
          }}
        >
          ↺ Volver al inicio
        </Button>
        <Button
          size="lg"
          className="rounded-full bg-primary px-8 py-6 text-base font-bold shadow-paper hover:scale-105"
          onClick={() => {
            sfx.success();
            window.print();
          }}
        >
          Imprimir mi círculo
        </Button>
      </div>
    </div>
  );
}
