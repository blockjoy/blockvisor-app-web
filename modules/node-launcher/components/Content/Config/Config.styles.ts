import { css } from '@emotion/react';

export const styles = {
  grid: (cols: number = 3) => css`
    align-items: stretch;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(${cols}, 1fr);
  `,
};
