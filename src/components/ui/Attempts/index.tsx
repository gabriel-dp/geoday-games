"use client";

import { Fragment, useEffect, useRef } from "react";
import { MdOutlineGroups, MdPhotoSizeSelectSmall, MdOutlineExplore, MdOutlinePublic } from "react-icons/md";

import useGame from "@/contexts/game/useGame";
import useLanguage from "@/contexts/language/useLanguage";

import { AreaCategory, ContinentCategory, DistanceCategory, PopulationCategory } from "./CategoryData";
import {
  Attempt,
  AttemptCategory,
  Categories,
  Category,
  Congratulations,
  CountryName,
  TableAttempts,
  TableContainer,
} from "./styles";

export default function Attempts() {
  const { t } = useLanguage();
  const {
    data: { dictionary, answer },
    daily: { attempts, hasFofeited, state },
  } = useGame();

  const hasWon = state == "finished" && !hasFofeited;

  const CATEGORIES = [
    { name: t`categories.continent`, icon: MdOutlinePublic, component: ContinentCategory },
    { name: t`categories.area`, icon: MdPhotoSizeSelectSmall, component: AreaCategory },
    { name: t`categories.population`, icon: MdOutlineGroups, component: PopulationCategory },
    { name: t`categories.distance`, icon: MdOutlineExplore, component: DistanceCategory },
  ];

  // Scrolls to the bottom every time that a new attempt is registered or the game ends
  const tableRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (attempts.length > 0 || state === "finished") {
      tableRef.current?.scrollTo({ top: tableRef.current?.scrollHeight, behavior: "smooth" });
    }
  }, [attempts, hasFofeited, state]);

  return (
    <TableContainer ref={tableRef}>
      <TableAttempts>
        <thead>
          <Categories>
            {CATEGORIES.map((category) => (
              <Category key={category.name}>
                <category.icon className="icon" />
                <span>{category.name}</span>
              </Category>
            ))}
          </Categories>
        </thead>
        <tbody>
          {attempts.map((attempt, index) => (
            <Fragment key={index + dictionary[attempt].name.exact}>
              <tr>
                <CountryName>
                  <span>{index + 1})</span>
                  <span>{dictionary[attempt].name.exact}</span>
                </CountryName>
              </tr>
              <Attempt>
                {CATEGORIES.map((category, index) => (
                  <AttemptCategory key={`${index}-${attempt}`}>
                    <category.component country={dictionary[attempt]} />
                  </AttemptCategory>
                ))}
              </Attempt>
            </Fragment>
          ))}
          {hasWon && (
            <tr>
              <Congratulations>
                <span className="flag">{dictionary[answer].data.flag.emoji}</span>
                <h2>{t`congratulations.title`}</h2>
                <p>
                  {t`congratulations.description`}: {dictionary[answer].name.exact}
                </p>
              </Congratulations>
            </tr>
          )}
          {state == "finished" && hasFofeited && (
            <>
              <tr>
                <CountryName className="forfeited">
                  <span>The country of the day is</span>
                  <span>{dictionary[answer].name.exact}</span>
                </CountryName>
              </tr>
              <Attempt>
                {CATEGORIES.map((category, index) => (
                  <AttemptCategory key={`${index}-${answer}`}>
                    <category.component country={dictionary[answer]} />
                  </AttemptCategory>
                ))}
              </Attempt>
            </>
          )}
        </tbody>
      </TableAttempts>
    </TableContainer>
  );
}
