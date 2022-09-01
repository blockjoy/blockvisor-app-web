import { themeDefault } from "./themeDefault";

import { Theme } from "@emotion/react";

export const themeDark: Theme = {
    ...themeDefault,
    id: "dark",
    colorBorder: "#363938",
    colorLabel: "#5F615D",
    colorDefault: "#5F615D",
    colorActive: "#363938",
    colorText: "#f9f9f9",
    colorCard: "#272a29",
    colorPlaceholder: "#A5A8A3",
    colorBackground: "#222524",
}