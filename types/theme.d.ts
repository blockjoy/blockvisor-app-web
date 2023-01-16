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
  colorLabel: string;
  colorPlaceholder: string;
  colorActive: string;
  colorHover: string;
  colorText: string;
  colorBackground: string;
  colorLightGrey: string;
  colorDanger: string;
  colorSidebar: string;
}

declare module '@emotion/react' {
  export interface Theme extends ITheme, ThemeProvider {}
}
