"use client";

import { ThemeProvider as StyledComponentsProvider } from "styled-components";

import StyledComponentsRegistry from "@/lib/styled-components";
import Global from "@/styles/global";
import useConfigs from "@/contexts/configs/useConfigs";
import { useMounted } from "@/hooks/useMounted";
import { AppTheme } from "@/styles/themes";
import { DarkTheme } from "@/styles/themes/themeDark";
import { LightTheme } from "@/styles/themes/themeLight";

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const { darkMode } = useConfigs();
  const mounted = useMounted();

  // Until mounted, render the deterministic light theme so the first client
  // render matches the server-rendered HTML and avoids a hydration mismatch.
  const theme: AppTheme = mounted && darkMode ? DarkTheme : LightTheme;

  return (
    <StyledComponentsRegistry>
      <StyledComponentsProvider theme={theme}>
        <Global theme={theme} />
        {children}
      </StyledComponentsProvider>
    </StyledComponentsRegistry>
  );
}
