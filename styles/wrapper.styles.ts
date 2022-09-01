import { css } from '@emotion/css';

const base = css`
  margin: 0 auto;
  padding-left: 32px;
  padding-right: 32px;
  width: 100%;
`;

const main = css`
  ${base}
  max-width: 1376px;
`;

export const wrapper = {
  main,
};
