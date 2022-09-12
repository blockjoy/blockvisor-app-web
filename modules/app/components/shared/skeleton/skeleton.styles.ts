import { css } from '@emotion/react';

export const skeletonStyles = {
  skeleton: css`
    display: block;
    background: #4d4f4d;
    border-radius: 4px;
    width: 100px;
    height: 20px;
  `,
  skeletonGrid: css`
    display: grid;
    gap: 30px;
    padding: 26px 0;
  `,
};
