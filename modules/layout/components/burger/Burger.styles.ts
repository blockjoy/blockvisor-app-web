import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  button: css`
    position: fixed;
    z-index: 11;
    display: grid;
    place-items: center;
    background: transparent;
    width: 64px;
    height: 72px;
    top: 0;
    border: 0;
    padding: 0;
    cursor: pointer;
    scale: 0.9;
  `,
  buttonClosed: css``,
  overlayOpen: css`
    z-index: 7;
  `,
};
