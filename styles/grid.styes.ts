import { css } from '@emotion/react';
import { breakpoints } from './variables.styles';

/**
 * Display grid
 */

const grid = css`
  display: grid;
  grid-row-gap: 32px;

  @media (--screen-medium-small) {
    grid-column-gap: 28px;
  }

  @media (--screen-medium) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

const gridSpacing = css`
  padding-left: 20px;
  padding-right: 20px;

  @media (--screen-large) {
    padding-left: 28px;
    padding-right: 28px;
  }
`;

const gridSpacingSmallOnly = css`
  padding-left: 28px;
  padding-right: 28px;

  @media (--screen-large) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export { grid, gridSpacing, gridSpacingSmallOnly };
