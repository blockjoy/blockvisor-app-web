import { css } from '@emotion/react';
import { breakpoints } from './variables.styles';

/**
 * Display grid
 */

export const grid = {
  base: css`
    display: grid;
    grid-row-gap: 32px;

    @media ${breakpoints.fromSml} {
      grid-column-gap: 28px;
    }

    @media ${breakpoints.fromMed} {
      grid-template-columns: repeat(12, 1fr);
    }
  `,
  spacing: css`
    padding-left: 20px;
    padding-right: 20px;

    @media ${breakpoints.fromHuge} {
      padding-left: 28px;
      padding-right: 28px;
    }
  `,
  smallOnly: css`
    padding-left: 28px;
    padding-right: 28px;

    @media ${breakpoints.fromHuge} {
      padding-left: 0;
      padding-right: 0;
    }
  `,
};
