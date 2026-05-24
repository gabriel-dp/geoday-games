import "styled-components";

type HexColor = `#${string}`;

declare module "styled-components" {
  export interface DefaultTheme {
    logo: string;
    map: string;
    primary: HexColor;
    primaryText: HexColor;
    primaryHighlight: HexColor;
    text: HexColor;
    background: HexColor;
    light: HexColor;
    dark: HexColor;
    correct: HexColor;
    almost: HexColor;
    wrong: HexColor;
    neutral: HexColor;
  }
}
