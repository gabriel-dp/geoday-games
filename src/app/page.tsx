"use client";

import useConfigs from "@/contexts/configs/useConfigs";
import useGame from "@/contexts/game/useGame";

export default function Home() {
  const { toggleTheme } = useConfigs();
  const game = useGame();

  console.log(game.data.dictionary);

  return (
    <div>
      <button onClick={toggleTheme}>tema</button>
      <p>{game.data.dictionary["BRA"]?.name.exact}</p>
    </div>
  );
}
