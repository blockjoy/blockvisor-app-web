import { css } from '@emotion/react';

const base = css`
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
`;

const main = css`
  ${base}
  max-width: 1676px;
`;

export const wrapper = {
  main,
};
