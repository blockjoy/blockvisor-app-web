import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  icon: (theme: ITheme) => css`
    position: relative;
    display: grid;
    place-items: center;
  `,
  iconDefault: (theme: ITheme) => css`
    > svg :is(path, rect) {
      fill: ${theme.colorDefault};
    }
  `,
  iconTooltip: css`
    position: relative;
    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }
  `,
};
