import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  icon: (size: string) => (theme: ITheme) =>
    css`
      position: relative;
      display: block;
      width: ${size};
      height: ${size};

      svg > circle {
        fill: ${theme.colorLightGrey};
      }

      svg path {
        fill: ${theme.colorDefault};
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
