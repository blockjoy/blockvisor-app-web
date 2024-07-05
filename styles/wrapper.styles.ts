import { css } from '@emotion/react';
import { breakpoints } from './variables.styles';

const base = css`
  margin: 0 auto;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;

  @media ${breakpoints.toXlrg} {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const main = css`
  ${base}
  max-width: 1676px;
`;

const full = css`
  ${base}
  max-width: 100%;
`;

export const wrapper = {
  main,
  full,
};
