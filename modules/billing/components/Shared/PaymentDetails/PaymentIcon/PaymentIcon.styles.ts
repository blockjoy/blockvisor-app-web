import { css } from '@emotion/react';

export const styles = {
  wrapper: (size?: 'small' | 'large') => css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${size === 'small' ? '20px' : '32px'};
    aspect-ratio: 1.4;

    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }

    svg {
      max-width: 100%;
      max-height: 100%;
    }
  `,
  icon: css`
    border-radius: 3px;
    overflow: hidden;
  `,
};
