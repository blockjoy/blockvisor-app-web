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
  visuallyHidden: css`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  `,
  ellipsis: css`
    display: block;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `,
};
