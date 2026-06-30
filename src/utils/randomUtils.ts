import seedrandom from "seedrandom";

export const getTodaySeed = (): string => {
  const date = new Date();
  const seed = date.toLocaleDateString("en-US");
  return seed;
};

export const randomSeeded = (seed: string): number => {
  const rng = seedrandom(seed);
  return rng();
};

// Convert a interval 0-1 to 0-x
export const mapIntegerInterval = (value: number, x: number) => {
  const fixed = Math.min(Math.floor(value * (x + 1)), x);
  return fixed;
};

export const seededShuffle = <T>(arr: T[], seed: string): T[] => {
  const result = [...arr];
  const rng = seedrandom(seed);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
