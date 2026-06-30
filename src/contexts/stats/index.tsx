"use client";

import { createContext, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";

import useStoredState from "@/hooks/useStoredState";
import { ComputedStats, GameResult, StatsContextI } from "@/types/stats";
import { getTodayString, getPreviousDay } from "@/utils/dateUtils";

export const StatsContext = createContext<StatsContextI>({
  results: [],
  computed: { played: 0, won: 0, winRate: 0, currentStreak: 0, bestStreak: 0, guessDistribution: {} },
  recordResult: () => {},
  syncPending: async () => {},
});

// ---------------------------------------------------------------------------
// Pure stat-computation helpers
// ---------------------------------------------------------------------------

function computeCurrentStreak(sortedDesc: GameResult[]): number {
  if (sortedDesc.length === 0) return 0;

  const today = getTodayString();
  const yesterday = getPreviousDay(today);

  const first = sortedDesc[0];
  if (first.date !== today && first.date !== yesterday) return 0;
  if (!first.won) return 0;

  let streak = 1;
  let prevDate = first.date;

  for (let i = 1; i < sortedDesc.length; i++) {
    const expected = getPreviousDay(prevDate);
    if (sortedDesc[i].date !== expected) break;
    if (!sortedDesc[i].won) break;
    streak++;
    prevDate = sortedDesc[i].date;
  }

  return streak;
}

function computeBestStreak(sortedAsc: GameResult[]): number {
  let best = 0;
  let streak = 0;
  let prevDate: string | null = null;

  for (const result of sortedAsc) {
    if (!result.won) {
      best = Math.max(best, streak);
      streak = 0;
      prevDate = null;
    } else if (prevDate === null || result.date === getNextDay(prevDate)) {
      streak++;
      prevDate = result.date;
    } else {
      best = Math.max(best, streak);
      streak = 1;
      prevDate = result.date;
    }
  }

  return Math.max(best, streak);
}

function getNextDay(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  date.setDate(date.getDate() + 1);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function computeStats(results: GameResult[]): ComputedStats {
  const sortedAsc = [...results].sort((a, b) => a.date.localeCompare(b.date));
  const sortedDesc = [...results].sort((a, b) => b.date.localeCompare(a.date));

  const won = results.filter((r) => r.won).length;
  const played = results.length;

  const guessDistribution: Record<string, number> = {};
  for (const r of results) {
    const key = r.forfeited ? "X" : String(r.attempts);
    guessDistribution[key] = (guessDistribution[key] ?? 0) + 1;
  }

  return {
    played,
    won,
    winRate: played > 0 ? Math.round((won / played) * 100) : 0,
    currentStreak: computeCurrentStreak(sortedDesc),
    bestStreak: computeBestStreak(sortedAsc),
    guessDistribution,
  };
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useStoredState<GameResult[]>("game_stats", []);
  const { data: session } = useSession();

  const recordResult = useCallback(
    (result: Omit<GameResult, "date" | "synced">) => {
      const today = getTodayString();
      setResults((prev) => {
        if (prev.some((r) => r.date === today)) return prev;
        return [...prev, { ...result, date: today, synced: false }];
      });
    },
    [setResults],
  );

  const syncPending = useCallback(async () => {
    if (!session?.user?.id) return;

    const unsynced = results.filter((r) => !r.synced);
    if (unsynced.length === 0) return;

    const syncedDates = new Set<string>();

    await Promise.all(
      unsynced.map(async (result) => {
        try {
          const res = await fetch("/api/results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
          });
          if (res.ok) syncedDates.add(result.date);
        } catch {
          // Will retry on next sync opportunity
        }
      }),
    );

    if (syncedDates.size > 0) {
      setResults((prev) => prev.map((r) => (syncedDates.has(r.date) ? { ...r, synced: true } : r)));
    }
  }, [session, results, setResults]);

  // Auto-sync whenever the user logs in
  useEffect(() => {
    if (session?.user?.id) {
      syncPending();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  const computed = computeStats(results);

  return (
    <StatsContext.Provider value={{ results, computed, recordResult, syncPending }}>{children}</StatsContext.Provider>
  );
}
