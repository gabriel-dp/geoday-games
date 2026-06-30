export const generateExpirationTime = () => {
  const time = new Date();
  time.setDate(time.getDate() + 1);
  time.setHours(0, 0, 0, 0);

  return time;
};

export const hasExpired = (expiration: Date) => {
  const now = new Date();
  const final = new Date(expiration.getFullYear(), expiration.getMonth(), expiration.getDate());

  return now.getTime() > final.getTime();
};

/** Returns today's date as YYYY-MM-DD in local time. */
export const getTodayString = (): string => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/** Returns the YYYY-MM-DD string for the day before the given date string. */
export const getPreviousDay = (dateStr: string): string => {
  const date = new Date(dateStr + "T00:00:00");
  date.setDate(date.getDate() - 1);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};
