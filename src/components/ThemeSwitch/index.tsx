"use client";

import { MdLightMode as SunIcon, MdDarkMode as MoonIcon } from "react-icons/md";

import useConfigs from "@/contexts/configs/useConfigs";
import { useMounted } from "@/hooks/useMounted";

import { Switch } from "./styles";

export default function ThemeSwitch() {
  const { darkMode, toggleTheme } = useConfigs();
  const mounted = useMounted();

  // Until mounted, render the deterministic light state so the first client
  // render matches the server-rendered HTML and avoids a hydration mismatch.
  const isDark = mounted && darkMode;

  return (
    <Switch>
      <input type="checkbox" id="cb" name="cb" checked={isDark} onChange={() => {}} />
      <label htmlFor="cb" onClick={toggleTheme}>
        <div className="track"></div>
        <div className="button">{isDark ? <MoonIcon className="icon" /> : <SunIcon className="icon" />}</div>
      </label>
    </Switch>
  );
}
