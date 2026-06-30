"use client";

import { GameProvider } from "@/contexts/game";

export default function FlagLayout({ children }: { children: React.ReactNode }) {
  return <GameProvider mode="flag">{children}</GameProvider>;
}
