import { css } from "@emotion/react";
import { ITheme } from "types/theme";

export const wrapperStyles = css`
    position: relative;
`;

export const controlStyles = (theme: ITheme) => css`
    width: 100%;
    height: 40px;
    border: 0;
    padding: 0 16px;
    appearance: none;
    border-radius: 4px;
    color: ${theme.colorText};
    background: ${theme.colorControlBackground};
    outline: none;
    transition: box-shadow 0.3s;

    &:focus {
        box-shadow: 0 0 0 2px ${theme.colorPrimary};
    }
`;

export const labelStyles = (theme: ITheme) => css`
    width: 100%;
    color: ${theme.colorLabel};
    margin-bottom: 8px;
`;