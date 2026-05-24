import "./language";

import { ConfigsProvider } from "./configs";
import { ThemeProvider } from "./theme";
import { GameProvider } from "./game";

export function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <ConfigsProvider>
      <ThemeProvider>
        <GameProvider>{children}</GameProvider>
      </ThemeProvider>
    </ConfigsProvider>
  );
}
