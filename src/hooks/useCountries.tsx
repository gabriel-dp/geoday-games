"use client";

import { useEffect, useState } from "react";

import { CountryData } from "@/types/country";
import { FetchStatus, useFetchData } from "@/hooks/useFetchData";

const BASE_REST_COUNTRIES_URL = "https://restcountries.com/v3.1";

const ALL_COUNTRIES_URL = `${BASE_REST_COUNTRIES_URL}/all?fields=cca3,name,translations,region,latlng,borders,area,population,area,independent`;

export function useCountries(): [CountryData[], FetchStatus] {
  const { data, status } = useFetchData<CountryData[]>(ALL_COUNTRIES_URL);
  const [allCountries, setAllCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    if (data) {
      const independentCountries = data.filter((country) => country.independent);
      setAllCountries(independentCountries);
    }
  }, [data]);

  return [allCountries, status];
}
