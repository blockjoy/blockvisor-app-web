import { Theme } from "@emotion/react";

export interface StyledProps {
    isPrimary?: boolean,
    isDanger?: boolean
}

export interface CssProps  {
    theme: Theme
}

export interface Props extends StyledProps {
    name: string,
}