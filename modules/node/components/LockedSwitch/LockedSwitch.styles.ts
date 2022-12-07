import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
    cursor: not-allowed;

    :hover > div > div {
      opacity: 1;
      visibility: visible;
    }
  `,
  switch: (theme: ITheme) => css`
    display: flex;
    justify-content: flex-end;
    width: 50px;
    height: 24px;
    padding: 2px;
    border-radius: 15px;
    border: 1px solid ${theme.colorPrimary};
    opacity: 0.2;
  `,
  handle: (theme: ITheme) => css`
    width: 18px;
    height: 18px;
    border-radius: inherit;
    background: ${theme.colorPrimary};
  `,
  badge: (theme: ITheme) => css`
    position: absolute;
    top: -12px;
    left: -12px;
    display: grid;
    place-items: center;
    padding: 3px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${theme.colorLabel};
    border: 3px solid ${theme.colorBackground};

    svg {
      width: 70%;
      height: 70%;
    }

    path {
      fill: ${theme.colorText};
    }
  `,

  tooltip: css`
    position: absolute;
    top: -48px;
    left: 50%;
    width: 190px;
    translate: -50% 0;
    background: #0c0c02;
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 4px;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
  `,
};
