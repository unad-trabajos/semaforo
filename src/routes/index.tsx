import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ParallaxStreet } from "@/components/game/ParallaxStreet";
import { PhaseIntro } from "@/components/game/PhaseIntro";
import { PhaseSeeds } from "@/components/game/PhaseSeeds";
import { PhaseGame } from "@/components/game/PhaseGame";
import { PhaseGallery } from "@/components/game/PhaseGallery";

export const Route = createFileRoute("/")({
  component: Index,
});

type Phase = "intro" | "seeds" | "game" | "gallery";

function Index() {
  const [phase, setPhase] = useState<Phase>("intro");

  return (
    <ParallaxStreet>
      <main className="relative">
        {/* progress dots */}
        <nav className="pointer-events-none fixed left-1/2 top-4 z-30 flex -translate-x-1/2 gap-2 rounded-full bg-paper/80 px-4 py-2 shadow-paper backdrop-blur">
          {(["intro", "seeds", "game", "gallery"] as Phase[]).map((p, i) => (
            <span
              key={p}
              className={`block h-2.5 w-2.5 rounded-full transition-all ${
                phase === p ? "scale-125 bg-primary" : "bg-kraft/60"
              }`}
              aria-label={`Fase ${i + 1}`}
            />
          ))}
        </nav>

        {phase === "intro" && <PhaseIntro onStart={() => setPhase("seeds")} />}
        {phase === "seeds" && <PhaseSeeds onNext={() => setPhase("game")} />}
        {phase === "game" && <PhaseGame onNext={() => setPhase("gallery")} />}
        {phase === "gallery" && <PhaseGallery onRestart={() => setPhase("intro")} />}
      </main>
    </ParallaxStreet>
  );
}
