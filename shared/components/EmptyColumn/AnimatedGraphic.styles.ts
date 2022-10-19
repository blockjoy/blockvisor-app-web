import { css } from '@emotion/react';

export const styles = {
  figure: css`
    & :global(svg *) {
      will-change: transform, opacity;
      backface-visibility: hidden;
    }

    & :global(g) {
      transform-origin: 50% 50%;
    }

    & :global(.star) {
      transform-origin: 80px 80px;
    }
  `,
};
