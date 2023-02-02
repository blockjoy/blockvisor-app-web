import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  bubble: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    width: 44px;
    height: 44px;
    padding: 0;
    font-size: 13px;
    font-weight: 600;
    background: ${theme.colorDarkGrey};
    border-radius: 6px;
    color: ${theme.colorPrimary};
    cursor: pointer;
  `,
  arrowIcon: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    width: 6px;
    height: 6px;

    path {
      fill: ${theme.colorPrimary};
    }
  `,
};
