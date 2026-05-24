import { ConfigsProvider } from "./configs";
import { ThemeProvider } from "./theme";

export function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <ConfigsProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ConfigsProvider>
  );
}
