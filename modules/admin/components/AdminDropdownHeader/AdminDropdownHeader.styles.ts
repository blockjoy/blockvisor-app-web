import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    height: 50px;
    border-bottom: 1px solid rgb(255 255 255 / 12%);
  `,
  h2: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    font-size: 14px;
    text-transform: capitalize;
  `,
  button: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    cursor: pointer;
    width: 40px;
    display: grid;
    place-items: center;

    svg path {
      fill: ${theme.colorDefault};
      transition: 0.3s;
    }

    :hover svg path {
      fill: ${theme.colorText};
    }
  `,
};
