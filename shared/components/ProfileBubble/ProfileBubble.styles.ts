import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  bubble: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    padding: 0;
    font-size: 13px;
    font-weight: 600;
    background: ${theme.colorBackground};
    border-radius: 6px;
    color: ${theme.colorPrimary};
    cursor: pointer;
    margin-left: 8px;
  `,
};
