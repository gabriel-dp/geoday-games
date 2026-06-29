"use client";

import {
  MdOutlineFlag as FlagIcon,
  MdOutlineLocationOn as HintIcon,
  MdOutlineSettings as SettingsIcon,
} from "react-icons/md";

import useLanguage from "@/contexts/language/useLanguage";
import usePopup from "@/hooks/usePopup";
import IconButton from "@/components/IconButton";
import Settings from "@/components/ui/Header/Settings";

import { ConfigsContainer, Footer, MainContainer, ModeCard, ModesContainer, TitleContainer } from "./styles";

export default function Home() {
  const { t } = useLanguage();
  const [openSettingsPopup, SettingsPopup] = usePopup(<Settings />);

  return (
    <MainContainer>
      <ConfigsContainer>
        <IconButton icon={SettingsIcon} onClick={openSettingsPopup} label="settings" />
      </ConfigsContainer>

      <TitleContainer>
        <h1>{t("home.title")}</h1>
        <p>{t("home.subtitle")}</p>
      </TitleContainer>

      <ModesContainer>
        <ModeCard href="/hints">
          <HintIcon />
          <h2>{t("modes.hints.name")}</h2>
          <p>{t("modes.hints.description")}</p>
        </ModeCard>
        <ModeCard href="/flag">
          <FlagIcon />
          <h2>{t("modes.flag.name")}</h2>
          <p>{t("modes.flag.description")}</p>
        </ModeCard>
      </ModesContainer>

      <Footer>
        {t("help.author")}
        <a href="https://gabriel-dp.github.io/" target="_blank" rel="noopener noreferrer">
          gabriel-dp
        </a>
      </Footer>

      {SettingsPopup}
    </MainContainer>
  );
}
