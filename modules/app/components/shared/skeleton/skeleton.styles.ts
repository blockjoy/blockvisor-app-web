import { css } from '@emotion/react';

export const skeletonStyles = {
  skeleton: css`
    display: block;
    background: #4d4f4d;
    border-radius: 4px;
    width: 100px;
    height: 20px;
  `,
  skeletonGrid: (padding: string) => css`
    display: grid;
    gap: 20px;
    padding: ${padding};
  `,
};
