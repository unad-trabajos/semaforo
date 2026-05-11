import { Button } from "@/components/ui/button";
import seedsImg from "@/assets/seeds.jpg";
import { sfx } from "./sounds";

export function PhaseSeeds({ onNext }: { onNext: () => void }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 px-6 py-16">
      <div className="text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-kraft-dark">
          Fase 1 · Las semillas
        </p>
        <h2 className="text-balance text-4xl font-bold md:text-5xl">
          Dos montones, dos realidades
        </h2>
      </div>

      <figure className="overflow-hidden rounded-3xl border-4 border-kraft/40 bg-paper shadow-card-paper">
        <img
          src={seedsImg}
          alt="Dos montones de semillas: el de las niñas claramente más grande que el de los niños"
          width={1920}
          height={1080}
          className="block w-full"
        />
        <figcaption className="paper-texture px-6 py-5 text-center text-base text-foreground/85 md:text-lg">
          Cada semilla representa a una persona que ha vivido <strong>maltrato</strong> en su infancia.
          El montón <strong>rosa</strong> es de las niñas. El <strong>azul</strong>, de los niños.
          <br />
          <span className="text-kraft-dark">¿Qué te dice la diferencia?</span>
        </figcaption>
      </figure>

      <Button
        size="lg"
        className="rounded-full bg-primary px-10 py-6 text-lg font-bold shadow-paper hover:scale-105"
        onClick={() => {
          sfx.click();
          onNext();
        }}
      >
        Quiero entender más →
      </Button>
    </div>
  );
}
