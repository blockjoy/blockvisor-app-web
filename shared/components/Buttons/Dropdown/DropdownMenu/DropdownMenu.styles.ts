import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  base: css`
    position: relative;
  `,
  right: css`
    left: auto;
    right: 0;
  `,
  menu: (theme: ITheme) => css`
    position: absolute;
    z-index: 5;
    top: 40px;
    left: 0;
    font-size: 14px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-16px);
    border-radius: 4px;
    min-width: max-content;
    transition: all 0.4s;
    background-color: ${theme.colorLightGrey};
    box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  `,
  isOpen: css`
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  `,
};
