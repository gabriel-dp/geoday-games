"use client";

import { useEffect, useState } from "react";

import { CountryData } from "@/types/country";
import { FetchStatus, useFetchData } from "@/hooks/useFetchData";

const BASE_REST_COUNTRIES_URL = "https://api.restcountries.com/countries/v5";

const ALL_COUNTRIES_URL = `${BASE_REST_COUNTRIES_URL}`;

export function useCountries(): [CountryData[], FetchStatus] {
  const { data, status } = useFetchData<{ data: { objects: CountryData[] } }>(
    ALL_COUNTRIES_URL,
    { headers: { Authorization: "Bearer rc_live_f8c8c57d60ed494abe5a281f60088d62" } },
    true,
  );
  const [allCountries, setAllCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    if (data) {
      const independentCountries = data.data.objects.filter((country) => country.classification.un_member);
      console.log(independentCountries);
      setAllCountries(independentCountries);
    }
  }, [data]);

  return [allCountries, status];
}
