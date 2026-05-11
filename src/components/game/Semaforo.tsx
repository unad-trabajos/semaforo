import semaforoImg from "@/assets/semaforo.png";

type Active = "verde" | "amarillo" | "rojo" | null;

export function Semaforo({ active = null, size = "md" }: { active?: Active; size?: "sm" | "md" | "lg" }) {
  const h = size === "lg" ? "h-[420px]" : size === "sm" ? "h-[180px]" : "h-[300px]";
  return (
    <div className={`relative ${h} w-auto select-none`}>
      <img
        src={semaforoImg}
        alt="Semáforo de cartón reciclado"
        className="h-full w-auto drop-shadow-[0_24px_24px_rgba(60,30,10,0.45)]"
        draggable={false}
      />
      {/* glow overlays positioned over the bulbs */}
      <div className="pointer-events-none absolute inset-0">
        <Bulb top="14%" color="var(--traffic-red)" on={active === "rojo"} />
        <Bulb top="36%" color="var(--traffic-yellow)" on={active === "amarillo"} />
        <Bulb top="58%" color="var(--traffic-green)" on={active === "verde"} />
      </div>
    </div>
  );
}

function Bulb({ top, color, on }: { top: string; color: string; on: boolean }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-300"
      style={{
        top,
        width: "22%",
        aspectRatio: "1",
        background: on ? color : "transparent",
        boxShadow: on
          ? `0 0 40px 12px color-mix(in oklab, ${color} 70%, transparent), 0 0 90px 30px color-mix(in oklab, ${color} 35%, transparent)`
          : "none",
        opacity: on ? 0.85 : 0,
      }}
    />
  );
}
