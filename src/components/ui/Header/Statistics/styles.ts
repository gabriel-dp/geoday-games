"use client";

import styled from "styled-components";

export const StatisticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 280px;

  h1 {
    font-size: 1.1rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
`;

export const TabBar = styled.div`
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.neutral}44;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.45rem 0;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;
  background: ${({ theme, $active }) => ($active ? theme.primary : "transparent")};
  color: ${({ theme, $active }) => ($active ? theme.primaryText : theme.primary)};
  border: none;

  & + & {
    border-left: 1px solid ${({ theme }) => theme.neutral}44;
  }
`;

export const StatsGrid = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
`;

export const StatCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;

  .value {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1;
  }

  .label {
    font-size: 0.65rem;
    text-align: center;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const TodaySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1rem;
  padding-bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.neutral}33;

  h2 {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    opacity: 0.7;
    margin-bottom: 0.25rem;
  }
`;

export const TodayRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;

  span:last-child {
    font-weight: 600;
  }
`;

export const DistributionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.neutral}33;

  h2 {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    opacity: 0.7;
    margin-bottom: 0.25rem;
  }
`;

export const DistributionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;

  .key {
    width: 1rem;
    text-align: right;
    font-weight: 700;
    flex-shrink: 0;
  }
`;

export const DistributionBar = styled.div<{ $width: number }>`
  height: 1.4rem;
  width: ${({ $width }) => $width}%;
  background: ${({ theme }) => theme.primary}CC;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.4rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryText};
  transition: width 0.3s ease;
  min-width: fit-content;
`;

export const GlobalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1rem;
  padding-bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.neutral}33;

  h2 {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    opacity: 0.7;
    margin-bottom: 0.25rem;
  }
`;

export const AuthSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.neutral}33;

  .section-title {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    opacity: 0.7;
  }

  .user-name {
    font-size: 0.82rem;
    opacity: 0.85;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .synced {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.8rem;
    opacity: 0.75;
  }

  .sync-btn,
  .auth-btn {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.35rem 0.75rem;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.neutral}66;
    background: transparent;
    color: inherit;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background 0.15s;

    &:hover {
      background: rgba(128, 128, 128, 0.15);
    }
  }
`;
