"use client";

import { GameProvider } from "@/contexts/game";

export default function HintsLayout({ children }: { children: React.ReactNode }) {
  return <GameProvider mode="hints">{children}</GameProvider>;
}
