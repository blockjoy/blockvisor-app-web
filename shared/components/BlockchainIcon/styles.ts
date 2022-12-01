import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  icon: (theme: ITheme) => css`
    position: relative;
    path {
      fill: ${theme.colorLabel};
    }

    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }
  `,
  tooltip: css`
    position: absolute;
    top: 50%;
    left: 130%;
    translate: 0 -18px;
    background: #0c0c02;
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 4px;
    color: #f9f9f9;
    opacity: 0;
    white-space: nowrap;
    visibility: hidden;
    transition-property: opacity, visibility;
    transition-duration: 0.01s;
    transition-delay: 0.5s;
  `,
};
