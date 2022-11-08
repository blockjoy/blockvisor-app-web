import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  modal: css`
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(6px);
  `,
  base: css`
    position: relative;
    border-radius: 8px;
    z-index: 2;
    background-color: var(--color-overlay-background-1);
    max-width: 760px;
    margin: 0 auto;
    height: 100%;

    @media ${breakpoints.fromSml} {
      display: flex;
      justify-items: center;
      align-items: center;
    }
  `,
};
