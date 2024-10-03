import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  outerWrapper: css`
    min-width: 0;
    flex: 1 0 auto;
    padding: 0 6px 0 0;
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
    width: 30px;
    min-width: 30px;
    height: 32px;
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
