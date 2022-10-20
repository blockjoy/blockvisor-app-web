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

    &:hover {
      color: ${theme.colorText};
    }

    &:hover path {
      fill: ${theme.colorText};
    }
  `,
  active: (theme: ITheme) => css`
    &,
    &:hover {
      color: ${theme.colorPrimary};
    }
    & path,
    &:hover path {
      fill: ${theme.colorPrimary};
    }
  `,
  text: css`
    letter-spacing: inherit;
    text-transform: inherit;
    color: inherit;
    line-height: 1;
  `,
};
