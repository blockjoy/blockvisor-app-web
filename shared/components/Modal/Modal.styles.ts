import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  modal: css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(6px);

    @media ${breakpoints.fromSml} {
      display: flex;
      justify-items: center;
      align-items: center;
    }
  `,
  base: css`
    position: relative;
    width: 100%;
    background-color: var(--color-overlay-background-1);
    max-width: 760px;
    margin: 0 auto;

    @media ${breakpoints.toMed} {
      height: 100vh;
    }

    @media ${breakpoints.fromMed} {
      border-radius: 8px;
    }
  `,
  isLocked: css`
    overflow: hidden;
  `,
};
