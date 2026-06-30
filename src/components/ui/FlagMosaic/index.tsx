"use client";

import { useMemo } from "react";

import { seededShuffle } from "@/utils/randomUtils";
import { FlagGrid, FlagPiece } from "./styles";

const COLS = 3;
const ROWS = 2;
const TOTAL = COLS * ROWS;

// Precomputed background positions for each grid cell (col, row)
const BG_X = ["0%", "50%", "100%"];
const BG_Y = ["0%", "100%"];

interface FlagMosaicProps {
  flagUrl: string;
  revealedPieces: number;
  seed: string;
}

export default function FlagMosaic({ flagUrl, revealedPieces, seed }: FlagMosaicProps) {
  // Shuffle the grid indices to determine reveal order
  const revealOrder = useMemo(
    () =>
      seededShuffle(
        Array.from({ length: TOTAL }, (_, i) => i),
        seed,
      ),
    [seed],
  );

  const cells = useMemo(
    () =>
      Array.from({ length: TOTAL }, (_, gridIndex) => {
        const revealPosition = revealOrder.indexOf(gridIndex);
        const revealed = revealPosition < revealedPieces;
        const col = gridIndex % COLS;
        const row = Math.floor(gridIndex / COLS);
        return { gridIndex, revealed, bgX: BG_X[col], bgY: BG_Y[row] };
      }),
    [revealOrder, revealedPieces],
  );

  return (
    <FlagGrid>
      {cells.map(({ gridIndex, revealed, bgX, bgY }) => (
        <FlagPiece key={gridIndex} $revealed={revealed} $flagUrl={flagUrl} $bgX={bgX} $bgY={bgY} />
      ))}
    </FlagGrid>
  );
}
