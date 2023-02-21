import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  overlay: css`
    position: fixed;
    z-index: 7;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(6px);
    opacity: 0;
    visibility: hidden;
    transition-property: opacity, visibility;
    transition-duration: 0.4s;

    @media ${breakpoints.fromXLrg} {
      display: none;
    }
  `,
  visible: css`
    opacity: 1;
    visibility: visible;
  `,
};
