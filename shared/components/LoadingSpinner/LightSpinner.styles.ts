import { css } from '@emotion/react';

export const styles = {
  spinner: css`
    transform-origin: center;
    animation: loading-spinner 1s linear infinite;
    opacity: 0.2;

    @keyframes loading-spinner {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }
  `,
};
