import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ITheme } from 'types/theme';

export const styles = {
  modal: (theme: ITheme) => css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: ${rgba(theme.colorDark, 0.5)};
    backdrop-filter: blur(6px);
    display: flex;
    justify-items: center;
    align-items: center;
  `,
  base: (theme: ITheme) => css`
    position: relative;
    width: 90%;
    background-color: ${theme.colorOverlay};
    max-width: 760px;
    overflow: auto;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    max-height: 90vh;
  `,
  isLocked: css`
    overflow: hidden;
  `,
  closeButton: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 40px;
    background: transparent;
    border: 0;
    cursor: pointer;

    path {
      fill: ${theme.colorText};
    }
  `,
  iconWrapper: css`
    width: 18px;
    height: 18px;
  `,
};
