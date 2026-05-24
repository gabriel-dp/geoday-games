"use client";

import { JSX } from "react";

import useGame from "@/contexts/game/useGame";
import Loading from "@/components/Loading";
import Attempts from "@/components/ui/Attempts";
import { BodyContent, MainContainer } from "./styles";
import Header from "@/components/ui/Header";
import UserInput from "@/components/ui/UserInput";

export default function HintsPage() {
  const {
    data: { status },
    daily: { state },
  } = useGame();

  let body: JSX.Element = <></>;
  switch (status) {
    case "loading":
      body = <Loading />;
      break;
    case "error":
      body = <p>ERROR</p>;
      break;
    case "success":
      body = <Attempts />;
      break;
  }

  return (
    <MainContainer>
      <Header />
      <BodyContent>{body}</BodyContent>
      {state == "playing" && status == "success" && <UserInput />}
    </MainContainer>
  );
}
