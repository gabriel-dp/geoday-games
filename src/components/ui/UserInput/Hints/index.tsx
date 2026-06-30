"use client";

import useGame from "@/contexts/game/useGame";
import useLanguage from "@/contexts/language/useLanguage";

import { HintsContainer } from "./styles";

function Hint(props: { name: string; description: string; children: React.ReactNode }) {
  return (
    <div className="hint">
      <div className="description">
        <h2>{props.name}</h2>
        <p>{props.description}</p>
      </div>
      <div className="answer">{props.children}</div>
    </div>
  );
}

export default function Hints() {
  const { t } = useLanguage();
  const { dictionary, answer } = useGame().data;

  const country = dictionary[answer];
  const { landlocked, languages, capitals, cars } = country.data;

  return (
    <HintsContainer>
      <h1>{t`popups.hints`}</h1>
      <Hint name={t`hints.languages.name`} description={t`hints.languages.description`}>
        {languages.map((lang) => (
          <p key={lang.name}>{lang.name}</p>
        ))}
      </Hint>
      <Hint name={t`hints.coastline.name`} description={t`hints.coastline.description`}>
        <p>{t(`boolean.${(!landlocked).toString()}` as const)}</p>
      </Hint>
      <Hint name={t`hints.capitals.name`} description={t`hints.capitals.description`}>
        {capitals.map((city) => (
          <p key={city.name}>{city.name}</p>
        ))}
      </Hint>
      <Hint name={t`hints.driving_side.name`} description={t`hints.driving_side.description`}>
        <p>{t(`driving_side.${cars.driving_side}` as const)}</p>
      </Hint>
    </HintsContainer>
  );
}
