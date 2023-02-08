import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  icon: (theme: ITheme) => css`
    position: relative;
    display: block;
    width: 28px;
    height: 28px;

    path {
      fill: ${theme.colorLabel};
    }

    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }
  `,
  tooltip: css`
    top: 50%;
    left: 120%;
    translate: 0 -50%;
  `,
};
