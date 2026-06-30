import { Country, CountryDictionary, CountryId } from "@/types/country";
import { FetchStatus } from "@/hooks/useFetchData";
import { generateExpirationTime } from "@/utils/dateUtils";

export type GameMode = "hints" | "flag";

export enum State {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
  PLAYING = "playing",
  FINISHED = "finished",
}

export interface GameDaily {
  state: State;
  attempts: CountryId[];
  usedMap: boolean;
  usedHints: boolean;
  hasFofeited: boolean;
  globalSynced: boolean;
  expirationTime: Date;
}

export interface GameData {
  status: FetchStatus;
  dictionary: CountryDictionary;
  answer: CountryId;
  mode: GameMode;
}

export interface GameFunctions {
  registerAttempt: (country: Country) => void;
  forfeit: () => void;
  usedHints: () => void;
  usedMap: () => void;
}

export interface GameContextI {
  daily: GameDaily;
  data: GameData;
  functions: GameFunctions;
}

export const initialDaily = (): GameDaily => ({
  state: State.IDLE,
  attempts: [],
  usedHints: false,
  usedMap: false,
  hasFofeited: false,
  globalSynced: false,
  expirationTime: generateExpirationTime(),
});

export const initialState = (): GameContextI => ({
  daily: initialDaily(),
  data: {
    status: FetchStatus.IDLE,
    dictionary: {},
    answer: "",
    mode: "hints",
  },
  functions: {
    registerAttempt: () => {},
    forfeit: () => {},
    usedHints: () => {},
    usedMap: () => {},
  },
});
