import { css } from '@emotion/react';

export const styles = {
  figure: css`
    & svg {
      will-change: transform, opacity;
      backface-visibility: hidden;
    }

    & g {
      transform-origin: 50% 50%;
    }

    & .star {
      transform-origin: 80px 80px;
    }
  `,
};
