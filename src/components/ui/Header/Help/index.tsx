"use client";

import Image from "next/image";

import useLanguage from "@/contexts/language/useLanguage";
import helpInput from "@/assets/help-input.png";
import helpAttempt from "@/assets/help-attempt.png";
import helpHints from "@/assets/help-hints.png";

import { HelpContainer } from "./styles";

export default function Help() {
  const { t } = useLanguage();

  return (
    <HelpContainer>
      <h1>{t`popups.help`}</h1>
      <p>{t`help.mission`}</p>
      <p>{t`help.input`}</p>
      <Image src={helpInput} alt="IMAGE-INPUT" width="350" />
      <p>{t`help.attempt`}</p>
      <Image src={helpAttempt} alt="IMAGE-ATTEMPT" width="350" />
      <p>{t`help.hints`}</p>
      <Image src={helpHints} alt="IMAGE-MAP" width="350" />
      <p>{t`help.enjoy`}</p>
      <hr />
      <p>
        {t`help.author`}
        <a className="link" href="https://gabriel-dp.github.io/" target="_blank">
          gabriel-dp
        </a>
      </p>
    </HelpContainer>
  );
}
