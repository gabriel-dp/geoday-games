export interface GameResult {
  date: string; // YYYY-MM-DD
  won: boolean;
  attempts: number;
  usedHints: boolean;
  usedMap: boolean;
  forfeited: boolean;
  synced: boolean;
}

export interface ComputedStats {
  played: number;
  won: number;
  winRate: number;
  currentStreak: number;
  bestStreak: number;
  guessDistribution: Record<string, number>;
}

export interface StatsContextI {
  results: GameResult[];
  computed: ComputedStats;
  recordResult: (result: Omit<GameResult, "date" | "synced">) => void;
  syncPending: () => Promise<void>;
}
