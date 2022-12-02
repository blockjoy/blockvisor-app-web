import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    position: relative;
    z-index: 5;
    display: grid;
    place-items: center;
    @media ${breakpoints.fromMed} {
      width: 580px;
      flex: 0 0 auto;
    }
  `,
  overlay: css`
    position: fixed;
    z-index: 4;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    opacity: 0;
    transition: 0.2s;
  `,
  overlayVisible: css`
    visibility: visible;
    opacity: 1;
  `,
};
