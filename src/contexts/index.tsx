"use client";

import "./language";

import { SessionProvider } from "next-auth/react";

import { ConfigsProvider } from "./configs";
import { ThemeProvider } from "./theme";
import { StatsProvider } from "./stats";

export function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <SessionProvider>
      <ConfigsProvider>
        <ThemeProvider>
          <StatsProvider>{children}</StatsProvider>
        </ThemeProvider>
      </ConfigsProvider>
    </SessionProvider>
  );
}
