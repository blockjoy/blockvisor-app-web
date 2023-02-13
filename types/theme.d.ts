import { ThemeProvider } from '@emotion/react';

interface ITheme {
  id?: string;
  fontPrimary: string;
  colorPrimary: string;
  colorPrimaryText: string;
  colorAccent: string;
  colorDefault: string;
  colorCard: string;
  colorBorder: string;
  colorBorderGrey: string;
  colorDarkGrey: string;
  colorInput: string;
  colorTooltip: string;
  colorLabel: string;
  colorPlaceholder: string;
  colorActive: string;
  colorHover: string;
  colorText: string;
  colorTextGrey: string;
  colorBackground: string;
  colorLightGrey: string;
  colorDanger: string;
  colorNote: string;
  colorOverlay: string;
  colorSuccess: string;
  colorTertiary: string;
  colorDark: string;
  screenXs: string;
  screenSm: string;
  screenMd: string;
  screenLg: string;
  screenXl: string;
  screenXxl: string;
}

declare module '@emotion/react' {
  export interface Theme extends ITheme, ThemeProvider {}
}
