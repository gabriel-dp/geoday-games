"use client";

import styled, { css, keyframes } from "styled-components";

const reveal = keyframes`
  from {
    opacity: 0;
    transform: scale(1.08);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const FlagGrid = styled.div`
  width: min(420px, 88vw);
  aspect-ratio: 3 / 2;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  border-radius: 0.5rem;
  outline: 1px solid ${(props) => props.theme.primary}33;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
  flex-shrink: 0;
`;

export const FlagPiece = styled.div<{
  $revealed: boolean;
  $flagUrl: string;
  $bgX: string;
  $bgY: string;
}>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.light};
  background-repeat: no-repeat;
  background-size: 300% 200%;
  background-position: ${(props) => `${props.$bgX} ${props.$bgY}`};

  ${(props) =>
    props.$revealed
      ? css`
          background-image: url(${props.$flagUrl});
          animation: ${reveal} 0.4s ease-out;
        `
      : css`
          background-image: none;
        `}
`;
