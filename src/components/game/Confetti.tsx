import { useEffect, useState } from "react";

const COLORS = ["var(--traffic-green)", "var(--traffic-yellow)", "var(--traffic-red)", "var(--kraft)"];

export function Confetti({ trigger }: { trigger: number }) {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (!trigger) return;
    const id = Date.now();
    setBursts((b) => [...b, { id, x: 50, y: 50 }]);
    const t = setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 1200);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {bursts.map((b) => (
        <div key={b.id} className="absolute" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
          {Array.from({ length: 28 }).map((_, i) => {
            const angle = (Math.PI * 2 * i) / 28;
            const dist = 80 + Math.random() * 120;
            return (
              <span
                key={i}
                className="absolute block h-2.5 w-2.5 rounded-sm"
                style={{
                  background: COLORS[i % COLORS.length],
                  ["--tx" as string]: `${Math.cos(angle) * dist}px`,
                  ["--tr" as string]: `${Math.random() * 720 - 360}deg`,
                  animation: `confetti-fall 1.1s cubic-bezier(0.2, 0.6, 0.4, 1) forwards`,
                  top: `${Math.sin(angle) * 20}px`,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
