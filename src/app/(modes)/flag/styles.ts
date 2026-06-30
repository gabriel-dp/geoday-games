"use client";

import styled, { keyframes } from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BodyContent = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FlagSection = styled.div`
  width: 100%;
  padding: 1.5rem 1rem 0.75rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const AttemptsCounter = styled.p`
  font-size: 0.8rem;
  color: ${(props) => props.theme.text};
  opacity: 0.7;
`;

export const GuessesList = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 0.5rem calc(50% - min(210px, 44vw));

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const GuessItem = styled.div<{ $correct: boolean }>`
  padding: 0.6rem 1rem;
  border-radius: 0.4rem;
  border: 1px solid ${(props) => props.theme.primary}33;
  background-color: ${(props) => (props.$correct ? props.theme.correct : props.theme.wrong)}AA;
  color: ${(props) => props.theme.primary};
  font-size: 0.875rem;
  animation: ${popIn} 0.25s ease-out;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  span:first-child {
    opacity: 0.6;
    font-size: 0.75rem;
  }
`;

export const EndMessage = styled.div`
  margin: 0.75rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.primary}22;
  border: 1px solid ${(props) => props.theme.primary}33;
  animation: ${popIn} 0.3s ease-out;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  text-align: center;

  .flag-emoji {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 1.1rem;
    color: ${(props) => props.theme.primary};
  }

  p {
    font-size: 0.85rem;
    color: ${(props) => props.theme.primary};
    opacity: 0.8;
  }
`;
