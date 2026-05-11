import { useEffect, useRef, type ReactNode } from "react";
import streetBg from "@/assets/street-bg.jpg";

export function ParallaxStreet({ children }: { children: ReactNode }) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${x * -18}px, ${y * -10}px, 0) scale(1.08)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#bfe1ee]">
      <div
        ref={bgRef}
        className="fixed inset-0 transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url(${streetBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
