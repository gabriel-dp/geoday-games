"use client";

import { createContext, useEffect, useState } from "react";

import { Country } from "@/types/country";
import { GameContextI, GameDaily, GameMode, State, initialDaily, initialState } from "@/types/game";
import { FetchStatus } from "@/hooks/useFetchData";
import useStoredState from "@/hooks/useStoredState";
import { useDictionary, getDailyAnswer } from "@/utils/countryUtils";
import { hasExpired, getTodayString } from "@/utils/dateUtils";
import { useCountries } from "@/hooks/useCountries";
import useStats from "@/contexts/stats/useStats";

export const GameContext = createContext<GameContextI>(initialState());

const STORAGE_KEYS: Record<GameMode, string> = {
  hints: "hintsDaily",
  flag: "flagDaily",
};

export function GameProvider(props: { children: React.ReactNode; mode: GameMode }) {
  const [daily, setDaily] = useStoredState<GameDaily>(STORAGE_KEYS[props.mode], initialDaily());
  const [data, requestStatus] = useCountries();
  const dictionary = useDictionary(data);
  const answer = getDailyAnswer(dictionary, props.mode);
  const { recordResult } = useStats();

  // Controls status based on requestStatus
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  useEffect(() => {
    const TIME = 3000;
    switch (requestStatus) {
      case "success":
        if (Object.keys(dictionary).length == 0) break;
        setTimeout(() => setStatus(FetchStatus.SUCCESS), TIME);
        break;
      case "error":
        setTimeout(() => setStatus(FetchStatus.ERROR), TIME);
        break;
      default:
        setStatus(requestStatus);
    }
  }, [requestStatus, dictionary]);

  // Resets daily data if it has expired
  useEffect(() => {
    if (hasExpired(new Date(daily.expirationTime))) {
      setDaily(initialDaily());
    }
  }, [daily.expirationTime, setDaily]);

  // Controls the game state based on request status
  useEffect(() => {
    if (daily.state == "idle" && status == "success") {
      setDaily((prev) => ({ ...prev, state: State.PLAYING }));
    }
  }, [daily.state, setDaily, status]);

  // Controls when the game finishes
  useEffect(() => {
    const { length } = daily.attempts;
    if (length > 0 && daily.attempts[length - 1] == answer) {
      setDaily((prev) => ({ ...prev, state: State.FINISHED }));
    }
  }, [daily.attempts, answer, setDaily]);

  // Record result when game transitions to finished
  useEffect(() => {
    if (daily.state === State.FINISHED) {
      recordResult({
        won: !daily.hasFofeited,
        attempts: daily.attempts.length,
        usedHints: daily.usedHints,
        usedMap: daily.usedMap,
        forfeited: daily.hasFofeited,
      });
    }
  }, [daily.state]); // eslint-disable-line react-hooks/exhaustive-deps

  // Submit result to global stats anonymously when game ends
  useEffect(() => {
    if (daily.state !== State.FINISHED || daily.globalSynced) return;
    fetch("/api/global-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: props.mode,
        date: getTodayString(),
        attempts: daily.attempts.length,
        won: !daily.hasFofeited,
      }),
    })
      .then((res) => {
        if (res.ok) setDaily((prev) => ({ ...prev, globalSynced: true }));
      })
      .catch(() => {});
  }, [daily.state, daily.globalSynced, daily.attempts.length, daily.hasFofeited, props.mode, setDaily]);

  const registerAttempt = (country: Country): void => {
    if (daily.attempts.every((attempt) => country.id != attempt)) {
      setDaily((prev) => ({ ...prev, attempts: [...prev.attempts, country.id] }));
    }
  };

  const forfeit = () => {
    if (daily.state == "playing") setDaily((prev) => ({ ...prev, state: State.FINISHED, hasFofeited: true }));
  };

  const usedHints = () => {
    if (daily.state == "playing") setDaily((prev) => ({ ...prev, usedHints: true }));
  };

  const usedMap = () => {
    if (daily.state == "playing") setDaily((prev) => ({ ...prev, usedMap: true }));
  };

  const value = {
    daily,
    data: {
      status,
      dictionary,
      answer,
      mode: props.mode,
    },
    functions: {
      registerAttempt,
      forfeit,
      usedHints,
      usedMap,
    },
  };

  return <GameContext.Provider value={value}>{props.children}</GameContext.Provider>;
}
