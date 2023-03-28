import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  button: (theme: ITheme) => css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0;
    border: 0;
    background: transparent;
    letter-spacing: inherit;
    text-transform: inherit;
    color: inherit;
    cursor: pointer;

    &,
    svg path {
      transition: 0.3s;
    }

    & svg path {
      fill: ${theme.colorLabel};
    }

    &:hover {
      color: ${theme.colorText};
    }

    &:hover path {
      fill: ${theme.colorText};
    }
  `,
  buttonActive: (theme: ITheme) => css`
    color: ${theme.colorText};
  `,
  active: (theme: ITheme) => css`
    svg :is(path, circle, rect) {
      fill: ${theme.colorText};
    }

    /* &,
    &:hover {
      color: ${theme.colorPrimary};
    }
    & path,
    &:hover path {
      fill: ${theme.colorPrimary};
    } */
  `,
  text: css`
    letter-spacing: inherit;
    text-transform: inherit;
    color: inherit;
    line-height: 1;
  `,
};
