import type { Metadata } from "next";

import { AppProvider } from "@/contexts";

export const metadata: Metadata = {
  title: "Geoday Games",
  description: "The best geography games!",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
