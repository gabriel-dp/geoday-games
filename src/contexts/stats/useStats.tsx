"use client";

import { useContext } from "react";
import { StatsContext } from "@/contexts/stats";

export default function useStats() {
  return useContext(StatsContext);
}
