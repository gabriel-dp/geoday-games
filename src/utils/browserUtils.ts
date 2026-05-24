// Check if browser default theme is dark
export const darkThemePreferred = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

// Get browser default language
export const getPreferredLanguage = (): string => navigator.language;
