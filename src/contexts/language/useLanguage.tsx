"use client";

import { useTranslation } from "react-i18next";
import ".";

export default function useLanguage() {
  const { t, i18n } = useTranslation();
  return { t, i18n };
}
