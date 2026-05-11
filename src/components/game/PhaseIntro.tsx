import { Button } from "@/components/ui/button";
import { Semaforo } from "./Semaforo";
import { sfx } from "./sounds";

export function PhaseIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-12 text-center">
      <div className="animate-[pop-in_0.6s_cubic-bezier(0.34,1.56,0.64,1)] max-w-2xl rounded-3xl bg-paper/90 px-8 py-6 shadow-card-paper backdrop-blur paper-texture">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-kraft-dark">
          Una historia para reflexionar
        </p>
        <h1 className="text-balance text-5xl font-bold text-foreground md:text-7xl">
          El Semáforo <span className="text-primary">del Respeto</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-foreground md:text-xl">
          Camina por la ciudad del buen trato, descubre qué es el respeto y construye
          tu propio círculo verde de amistad.
        </p>
      </div>

      <div className="animate-[float_6s_ease-in-out_infinite]">
        <Semaforo size="md" />
      </div>

      <Button
        size="lg"
        className="rounded-full bg-primary px-10 py-6 text-lg font-bold text-primary-foreground shadow-card-paper transition hover:scale-105 hover:bg-primary/90"
        onClick={() => {
          sfx.click();
          onStart();
        }}
      >
        Comenzar el viaje →
      </Button>
    </div>
  );
}
