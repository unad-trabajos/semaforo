import { useEffect, useRef, type ReactNode } from "react";
import streetBg from "@/assets/street-bg.jpg";
import clouds from "@/assets/clouds.png";

export function ParallaxStreet({ children }: { children: ReactNode }) {
  const skyRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const streetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (skyRef.current) skyRef.current.style.transform = `translate3d(${x * -8}px, ${y * -4}px, 0) scale(1.05)`;
      if (cloudsRef.current) cloudsRef.current.style.transform = `translate3d(${x * -22}px, ${y * -10}px, 0)`;
      if (streetRef.current) streetRef.current.style.transform = `translate3d(${x * -38}px, ${y * -16}px, 0) scale(1.08)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden gradient-sky">
      <div ref={skyRef} className="absolute inset-0 gradient-sky transition-transform duration-300 ease-out" />
      <div
        ref={cloudsRef}
        className="absolute inset-x-0 top-0 h-[40vh] opacity-90 transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url(${clouds})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        ref={streetRef}
        className="absolute inset-x-[-8%] bottom-[-4%] h-[75vh] transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url(${streetBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
