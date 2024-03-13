import { css } from '@emotion/react';

const row = css`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const col = css`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const form = {
  row,
  col,
};
