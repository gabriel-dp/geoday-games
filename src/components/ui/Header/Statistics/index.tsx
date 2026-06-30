"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { MdSync, MdCloudDone, MdLogin, MdLogout } from "react-icons/md";

import useLanguage from "@/contexts/language/useLanguage";
import useStats from "@/contexts/stats/useStats";
import { useMounted } from "@/hooks/useMounted";
import { getTodayString } from "@/utils/dateUtils";

import {
  AuthSection,
  DistributionBar,
  DistributionRow,
  DistributionSection,
  StatCell,
  StatisticsContainer,
  StatsGrid,
  TodaySection,
  TodayRow,
} from "./styles";

export default function Statistics() {
  const { t } = useLanguage();
  const { computed, results, syncPending } = useStats();
  const { data: session } = useSession();
  const mounted = useMounted();

  const today = getTodayString();
  const todayResult = mounted ? results.find((r) => r.date === today) : undefined;
  const pendingCount = mounted ? results.filter((r) => !r.synced).length : 0;

  // Build sorted distribution keys: numeric ascending, then "X"
  const distKeys = Object.keys(mounted ? computed.guessDistribution : {}).sort((a, b) => {
    if (a === "X") return 1;
    if (b === "X") return -1;
    return Number(a) - Number(b);
  });
  const maxDistValue = Math.max(1, ...Object.values(computed.guessDistribution));

  return (
    <StatisticsContainer>
      <h1>{t("popups.statistics")}</h1>

      {/* All-time summary */}
      <StatsGrid>
        <StatCell>
          <span className="value">{mounted ? computed.played : 0}</span>
          <span className="label">{t("statistics.played")}</span>
        </StatCell>
        <StatCell>
          <span className="value">{mounted ? computed.won : 0}</span>
          <span className="label">{t("statistics.won")}</span>
        </StatCell>
        <StatCell>
          <span className="value">{mounted ? computed.winRate : 0}%</span>
          <span className="label">{t("statistics.winRate")}</span>
        </StatCell>
        <StatCell>
          <span className="value">{mounted ? computed.currentStreak : 0}</span>
          <span className="label">{t("statistics.currentStreak")}</span>
        </StatCell>
        <StatCell>
          <span className="value">{mounted ? computed.bestStreak : 0}</span>
          <span className="label">{t("statistics.bestStreak")}</span>
        </StatCell>
      </StatsGrid>

      {/* Today's game flags */}
      {todayResult && (
        <TodaySection>
          <h2>{t("statistics.today")}</h2>
          <TodayRow>
            <span>{t("statistics.usedHints")}</span>
            <span>{t(`boolean.${todayResult.usedHints.toString()}` as const)}</span>
          </TodayRow>
          <TodayRow>
            <span>{t("statistics.usedMap")}</span>
            <span>{t(`boolean.${todayResult.usedMap.toString()}` as const)}</span>
          </TodayRow>
        </TodaySection>
      )}

      {/* Guess distribution */}
      {mounted && computed.played > 0 && (
        <DistributionSection>
          <h2>{t("statistics.distribution")}</h2>
          {distKeys.map((key) => {
            const count = computed.guessDistribution[key];
            const widthPct = Math.max(8, Math.round((count / maxDistValue) * 100));
            return (
              <DistributionRow key={key}>
                <span className="key">{key}</span>
                <DistributionBar $width={widthPct}>{count}</DistributionBar>
              </DistributionRow>
            );
          })}
        </DistributionSection>
      )}

      {/* Auth + sync */}
      <AuthSection>
        <span className="section-title">{t("auth.cloudSync")}</span>
        {session?.user ? (
          <>
            <span className="user-name">
              {t("auth.loggedInAs")} {session.user.name}
            </span>
            <div className="actions">
              {pendingCount > 0 ? (
                <button className="sync-btn" onClick={syncPending}>
                  <MdSync />
                  {t("statistics.syncNow")} ({pendingCount})
                </button>
              ) : (
                <span className="synced">
                  <MdCloudDone />
                  {t("statistics.allSynced")}
                </span>
              )}
              <button className="auth-btn" onClick={() => signOut()}>
                <MdLogout />
                {t("auth.signOut")}
              </button>
            </div>
          </>
        ) : (
          <button className="auth-btn" onClick={() => signIn("google")}>
            <MdLogin />
            {t("auth.signIn")}
          </button>
        )}
      </AuthSection>
    </StatisticsContainer>
  );
}
