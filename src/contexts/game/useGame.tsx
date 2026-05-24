"use client";

import { useContext } from "react";

import { GameContext } from "@/contexts/game";

export default function useGame() {
  const context = useContext(GameContext);
  return context;
}
