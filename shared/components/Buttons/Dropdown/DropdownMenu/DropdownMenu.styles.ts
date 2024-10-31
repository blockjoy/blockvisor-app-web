import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  right: css`
    left: auto;
    right: 0;
  `,
  menu: (theme: ITheme) => css`
    position: absolute;
    overflow: hidden;
    z-index: 2;
    top: 40px;
    left: 0;
    font-size: 14px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-16px) translateZ(0);
    border-radius: 4px;
    min-width: max-content;
    transition-property: transform, opacity, visibility;
    transition-duration: 0.4s;
    background-color: ${theme.colorLightGrey};
    box-shadow: 0 0 10px rgb(0 0 0 / 30%);
    pointer-events: none;
  `,
  isOpen: css`
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  `,
};
