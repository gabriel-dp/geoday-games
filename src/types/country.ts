export interface CountryData {
  // names
  names: {
    common: string;
    alternates: string[];
    native: Record<string, { common: string; official: string }>;
    translations: Record<string, { common: string; official: string }>;
  };
  capitals: { name: string }[];

  // codes
  codes: {
    alpha_2: string;
    alpha_3: string;
  };

  // flag
  flag: {
    emoji: string;
    unicode: string;
    html_entity: string;
    url_png: string;
    url_svg: string;
  };

  // geography & people
  region: string;
  subregion: string;
  continents: string[];
  landlocked: boolean;
  borders: string[]; // alpha_3 codes
  area: { kilometers: number };
  coordinates: { lat: number; lng: number };
  population: number;
  languages: {
    iso_639_1: string;
    iso_639_2: string;
    iso_639_3: string;
    bcp_47: string;
    name: string;
    native: string;
  }[];

  // currencies & calling codes
  calling_codes: string[];

  // cars
  cars: {
    driving_side: "left" | "right";
  };

  // classification & memberships
  classification: {
    un_member: boolean;
  };
  parent: {
    alpha_2: string;
    alpha_3: string;
  };

  // government
  government_type: string;
}

export type CountryId = string;

export interface Country {
  id: CountryId;
  name: {
    exact: string;
    alias: string[];
  };
  data: CountryData;
}

export type CountryDictionary = Record<CountryId, Country>;
