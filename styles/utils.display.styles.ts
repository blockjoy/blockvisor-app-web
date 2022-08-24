import { css } from '@emotion/react';
import { breakpoints } from './variables.styles';

export const display = {
  none: css`
    display: none;
  `,
  block: css`
    display: block;
  `,
  inline: css`
    display: inline;
  `,
  inlineBlock: css`
    display: inline-block;
  `,
  flex: css`
    display: flex;
  `,
  inlineFlex: css`
    display: inline-flex;
  `,
  grid: css`
    display: grid;
  `,
  table: css`
    display: table;
  `,
  displayToMediumLarge: css`
    @media ${breakpoints.fromMed} {
      display: none;
    }
  `,
  hideFromMediumLarge: css`
    display: none;

    @media ${breakpoints.fromMed} {
      display: initial;
    }
  `,
};
