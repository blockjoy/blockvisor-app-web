import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  outerWrapper: css`
    min-width: 0;
    padding: 0 12px 0 2px;
  `,
  wrapper: css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  overlay: (theme: ITheme) => css`
    position: fixed;
    z-index: 0;
    inset: 0;
    background: rgb(0 0 0 / 20%);
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
  `,
  overlayVisible: css`
    opacity: 1;
    visibility: visible;
  `,
  dropdownButton: (theme: ITheme) => css`
    position: relative;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 0;
    display: grid;
    place-items: center;
    width: 36px;
    min-width: 36px;
    height: 36px;
    border-radius: 6px;
    transition: 0.3s;

    :hover {
      background: rgb(255 255 255 / 2%);
    }

    :hover path {
      fill: ${theme.colorText};
      transition: 0.3s;
    }
  `,
  resetButtonWrapper: css`
    padding: 10px;
  `,
};
