import { css } from '@emotion/react';

export const table = {
  base: css`
    width: 100%;
    text-align: left;
    border-collapse: collapse;
  `,
  row: css`
    border-bottom: 1px solid var(--color-text-5-o10);
  `,
  heading: css`
    font-weight: var(--font-weight-normal);
  `,
};
