"use client";

import useConfigs from "@/contexts/configs/useConfigs";

export default function Home() {
  const { toggleTheme } = useConfigs();

  return <button onClick={toggleTheme}>tema</button>;
}
