import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  button: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 16px 0;
    border: 0;
    background: transparent;
    letter-spacing: inherit;
    text-transform: inherit;
    color: ${theme.colorDefault};
    cursor: pointer;
    opacity: 0.8;

    &,
    svg path {
      transition: 0.3s;
    }

    svg path {
      fill: ${theme.colorText};
    }

    :hover {
      opacity: 1;
    }
  `,
  buttonActive: (theme: ITheme) => css`
    color: ${theme.colorText};
  `,
  icon: (isActive: boolean, isAscending: boolean) => (theme: ITheme) =>
    css`
      ${isActive &&
      css`
        svg :is(path, circle, rect) {
          fill: ${theme.colorText};
        }
      `}
      ${isAscending &&
      css`
        transform: rotate(180deg);
      `}
    `,
  text: css`
    letter-spacing: inherit;
    text-transform: inherit;
    color: inherit;
    line-height: 1;
  `,
};
