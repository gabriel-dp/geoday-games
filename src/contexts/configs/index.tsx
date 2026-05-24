"use client";

import { createContext } from "react";

import useStoredState from "@/hooks/useStoredState";
import { darkThemePreferred } from "@/utils/browserUtils";
import { useMounted } from "@/hooks/useMounted";

interface StoredConfigs {
  darkMode: boolean;
}

interface ConfigsContextI extends StoredConfigs {
  toggleTheme: () => void;
}

export const ConfigsContext = createContext<ConfigsContextI>({} as ConfigsContextI);

export function ConfigsProvider(props: { children: React.ReactNode }) {
  const mounted = useMounted();
  const [configs, setConfigs] = useStoredState<StoredConfigs>("configs", {
    darkMode: darkThemePreferred(),
  });

  if (!mounted) {
    return null;
  }

  const { darkMode } = configs;
  const toggleTheme = () => {
    setConfigs((config) => ({
      ...config,
      darkMode: !config.darkMode,
    }));
  };

  return <ConfigsContext.Provider value={{ darkMode, toggleTheme }}>{props.children}</ConfigsContext.Provider>;
}
