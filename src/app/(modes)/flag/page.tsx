"use client";

import { JSX, useEffect } from "react";

import useGame from "@/contexts/game/useGame";
import useLanguage from "@/contexts/language/useLanguage";
import Loading from "@/components/Loading";
import Header from "@/components/ui/Header";
import UserInput from "@/components/ui/UserInput";
import FlagMosaic from "@/components/ui/FlagMosaic";

import { AttemptsCounter, BodyContent, EndMessage, FlagSection, GuessItem, GuessesList, MainContainer } from "./styles";

const MAX_ATTEMPTS = 6;

export default function FlagPage() {
  const { t } = useLanguage();
  const {
    data: { status, dictionary, answer },
    daily: { state, attempts, hasFofeited },
    functions: { forfeit },
  } = useGame();

  const hasWon = state === "finished" && !hasFofeited;
  const revealedPieces = state === "finished" ? MAX_ATTEMPTS : Math.min(attempts.length, MAX_ATTEMPTS);

  // Auto-forfeit once all attempts are exhausted
  useEffect(() => {
    if (state === "playing" && attempts.length >= MAX_ATTEMPTS) {
      forfeit();
    }
  }, [attempts.length, state, forfeit]);

  let body: JSX.Element = <></>;
  switch (status) {
    case "loading":
      body = <Loading />;
      break;
    case "error":
      body = <p>ERROR</p>;
      break;
    case "success":
      body = (
        <>
          <FlagSection>
            <FlagMosaic flagUrl={dictionary[answer]?.data.flag.url_svg} revealedPieces={revealedPieces} seed={answer} />
            <AttemptsCounter>
              {attempts.length} / {MAX_ATTEMPTS} {t("flag_mode.attempts_used")}
            </AttemptsCounter>
          </FlagSection>

          <GuessesList>
            {attempts.map((attempt, i) => (
              <GuessItem key={attempt} $correct={attempt === answer}>
                <span>{i + 1}.</span>
                <span>{dictionary[attempt]?.name.exact}</span>
              </GuessItem>
            ))}

            {hasWon && (
              <EndMessage>
                <span className="flag-emoji">{dictionary[answer]?.data.flag.emoji}</span>
                <h2>{t("congratulations.title")}</h2>
                <p>
                  {t("congratulations.description")}: {dictionary[answer]?.name.exact}
                </p>
              </EndMessage>
            )}

            {state === "finished" && hasFofeited && (
              <EndMessage>
                <span className="flag-emoji">{dictionary[answer]?.data.flag.emoji}</span>
                <h2>{t("flag_mode.answer_reveal")}</h2>
                <p>{dictionary[answer]?.name.exact}</p>
              </EndMessage>
            )}
          </GuessesList>
        </>
      );
      break;
  }

  return (
    <MainContainer>
      <Header />
      <BodyContent>{body}</BodyContent>
      {state === "playing" && attempts.length < MAX_ATTEMPTS && status === "success" && <UserInput />}
    </MainContainer>
  );
}
