import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl px-8 py-1.5 text-sm font-medium transition-all duration-300 [--bg-size:300%] hover:scale-[1.02]",
        "animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%]",
        "text-zinc-900 font-semibold",
        "border-2 border-transparent",
        "shadow-[0_8px_16px_rgba(0,0,0,0.25),0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3),0_6px_8px_rgba(0,0,0,0.2)]",
        "backdrop-blur-sm",
        className,
      )}
    >
      <div
        className="absolute -inset-[2px] block h-[calc(100%+4px)] w-[calc(100%+4px)] animate-gradient bg-gradient-to-r from-[#eeffb0] via-[#c6edf1] to-[#d7d7d7] bg-[length:var(--bg-size)_100%] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]"
      />
      {children}
    </div>
  );
}
