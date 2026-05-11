import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Semaforo } from "./Semaforo";
import { Confetti } from "./Confetti";
import { SITUATIONS, type Light, type Situation } from "./situations";
import { sfx } from "./sounds";

const LIGHTS: { id: Light; label: string; color: string; hint: string }[] = [
  { id: "verde", label: "Buen trato", color: "var(--traffic-green)", hint: "Me hace sentir bien y seguro" },
  { id: "amarillo", label: "Alerta", color: "var(--traffic-yellow)", hint: "Me hace sentir triste o incómodo" },
  { id: "rojo", label: "¡Peligro!", color: "var(--traffic-red)", hint: "Es violencia, debo pedir ayuda" },
];

export function PhaseGame({ onNext }: { onNext: () => void }) {
  const deck = useMemo(() => [...SITUATIONS].sort(() => Math.random() - 0.5), []);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState<Light | null>(null);
  const [feedback, setFeedback] = useState<"ok" | "fail" | null>(null);
  const [score, setScore] = useState(0);
  const [confetti, setConfetti] = useState(0);
  const [dragOver, setDragOver] = useState<Light | null>(null);

  const current: Situation | undefined = deck[index];
  const done = index >= deck.length;

  function handleDrop(target: Light) {
    if (!current) return;
    setDragOver(null);
    setActive(target);
    if (target === current.answer) {
      sfx.success();
      setFeedback("ok");
      setScore((s) => s + 1);
      setConfetti((c) => c + 1);
      setTimeout(() => {
        setFeedback(null);
        setActive(null);
        setIndex((i) => i + 1);
      }, 900);
    } else {
      sfx.error();
      setFeedback("fail");
      setTimeout(() => {
        setFeedback(null);
        setActive(null);
      }, 800);
    }
  }

  if (done) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
        <Semaforo active="verde" size="md" />
        <h2 className="text-4xl font-bold md:text-5xl">¡Lo lograste! 🎉</h2>
        <p className="text-lg text-foreground/80">
          Acertaste <strong>{score}</strong> de <strong>{deck.length}</strong> situaciones.
          Ahora sabes reconocer cuándo algo es buen trato, cuándo encender la alerta y cuándo pedir ayuda.
        </p>
        <Button
          size="lg"
          className="rounded-full bg-primary px-10 py-6 text-lg font-bold shadow-paper hover:scale-105"
          onClick={() => {
            sfx.click();
            onNext();
          }}
        >
          Crear mi círculo verde →
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-12">
      <Confetti trigger={confetti} />
      <div className="text-center">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-kraft-dark">
          Fase 2 · El detector de realidades
        </p>
        <h2 className="text-balance text-3xl font-bold md:text-4xl">
          Arrastra cada situación al color del semáforo
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          {index + 1} / {deck.length} · Aciertos: <strong>{score}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
        {/* Card to drag */}
        <div className="flex justify-center">
          {current && (
            <div
              key={current.id}
              draggable
              onDragStart={() => sfx.pickup()}
              className={`group relative w-72 cursor-grab select-none rounded-3xl border-4 border-kraft/50 bg-paper p-6 paper-texture shadow-card-paper transition-transform active:scale-95 active:cursor-grabbing ${
                feedback === "ok" ? "animate-[pop-in_0.4s]" : ""
              } ${feedback === "fail" ? "animate-[wiggle_0.4s]" : ""}`}
              style={{ animation: "pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}
            >
              <div className="text-7xl">{current.emoji}</div>
              <p className="mt-4 text-xl font-semibold leading-snug">{current.text}</p>
              <span className="absolute -right-3 -top-3 rounded-full bg-kraft-dark px-3 py-1 text-xs font-bold text-paper shadow-paper">
                arrastra →
              </span>
            </div>
          )}
        </div>

        {/* Semaforo */}
        <div className="flex justify-center">
          <Semaforo active={active} size="lg" />
        </div>

        {/* Drop zones */}
        <div className="flex flex-col gap-3">
          {LIGHTS.map((l) => (
            <button
              key={l.id}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(l.id);
              }}
              onDragLeave={() => setDragOver((d) => (d === l.id ? null : d))}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(l.id);
              }}
              onClick={() => handleDrop(l.id)}
              className={`flex items-center gap-4 rounded-2xl border-4 px-5 py-4 text-left transition-all ${
                dragOver === l.id
                  ? "scale-105 border-kraft-dark bg-paper shadow-card-paper"
                  : "border-kraft/40 bg-paper/80 shadow-paper hover:scale-[1.02]"
              }`}
            >
              <span
                className="block h-12 w-12 shrink-0 rounded-full border-2 border-kraft-dark/30"
                style={{
                  background: l.color,
                  boxShadow: `0 0 20px 2px color-mix(in oklab, ${l.color} 60%, transparent)`,
                }}
              />
              <span>
                <span className="block text-lg font-bold">{l.label}</span>
                <span className="block text-xs text-foreground/70">{l.hint}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-foreground/60">
        Tip: en móvil puedes <strong>tocar</strong> el color en lugar de arrastrar.
      </p>
    </div>
  );
}
