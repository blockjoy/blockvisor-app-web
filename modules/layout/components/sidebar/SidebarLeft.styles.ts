import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: grid;
    justify-items: center;
    width: 56px;
    padding: 16px 0 0;
    border-right: 1px solid #363938;
  `,
  button: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    height: 40px;
    width: 40px;
    border-radius: 8px;
    border: 0;
    background: ${theme.colorActive};
  `,
  icon: (theme: ITheme) => css`
    & path {
      fill: ${theme.colorPrimary};
      fill-opacity: 1;
    }
  `,
};
