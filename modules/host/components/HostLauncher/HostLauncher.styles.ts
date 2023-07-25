import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  header: css`
    display: flex;
    align-items: center;
    height: 72px;
  `,
  button: (theme: ITheme) => css`
    min-width: 150px;

    svg path {
      fill: ${theme.colorText};
    }
  `,
  timeline: (theme: ITheme) => css`
    counter-reset: steps;
    display: grid;

    > li {
      position: relative;
      display: flex;
      gap: 14px;
      min-width: 0;
    }

    > li::before {
      position: relative;
      z-index: 2;
      counter-increment: steps;
      content: counter(steps);
      display: grid;
      place-items: center;
      width: 32px;
      height: 32px;
      flex: 0 0 32px;
      border-radius: 50%;
      color: ${theme.colorDefault};
      background: ${theme.colorBorder};
      font-size: 14px;
    }

    > li::after {
      content: '';
      position: absolute;
      z-index: 1;
      top: 36px;
      left: 16px;
      transform: translate(-50%, 0);
      width: 3px;
      border-radius: 2px;
      height: calc(100% - 40px);
      background: ${theme.colorBorder};
    }

    > li:last-child::after {
      display: none;
    }

    > li > div {
      flex: 1 1 auto;
      padding-top: 11px;
      min-width: 0;
    }
  `,
};
