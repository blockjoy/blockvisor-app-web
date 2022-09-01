import { themeDefault } from "./themeDefault";

import { Theme } from "@emotion/react";

export const themeLight: Theme = {
    ...themeDefault,
    id: "light",
    colorPrimary: "#bff589",
    colorAccent: "#bff589",
    colorBorder: "#e7e7e7",
    colorLabel: "#6d6e6c",
    colorDefault: "#5F615D",
    colorActive: "#ebebeb",
    colorText: "#1a1a1a",
    colorCard: "#ffffff",
    colorPlaceholder: "#A5A8A3",
    colorBackground: "#fafafa",
    screenXs: "500px",
    screenSm: "768px",
    screenMd: "980px",
    screenLg: "1160px",
    screenXl: "1400px",
    screenXxl: "1800px",
}