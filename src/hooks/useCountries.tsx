"use client";

import { useEffect, useState } from "react";

import { CountryData } from "@/types/country";
import { FetchStatus, useFetchData } from "@/hooks/useFetchData";

export function useCountries(): [CountryData[], FetchStatus] {
  const { data, status } = useFetchData<CountryData[]>("/api/countries");
  const [allCountries, setAllCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    if (data) {
      setAllCountries(data);
    }
  }, [data]);

  return [allCountries, status];
}
