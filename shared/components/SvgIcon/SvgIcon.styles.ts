import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  icon: (theme: ITheme) => css`
    position: relative;
    display: grid;
    place-items: center;

    > svg :is(path, circle, rect) {
      fill: ${theme.colorDefault};
    }

    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }
  `,
};
