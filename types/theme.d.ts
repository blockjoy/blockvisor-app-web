import { ThemeProvider } from "@emotion/react";

interface ITheme {
    id: string,
    colorPrimary: string;
    colorAccent: string;
    colorDefault: string;
    colorCard: string;
    colorBorder: string;
    colorLabel: string;
    colorPlaceholder: string;
    colorActive: string;
    colorText: string;
    colorBackground: string;
    screenXs: string;
    screenSm: string;
    screenMd: string;
    screenLg: string;
    screenXl: string;
    screenXxl: string;
}

declare module "@emotion/react" {
    export interface Theme extends ITheme extends ThemeProvider {}
}

declare module "@emotion/css"