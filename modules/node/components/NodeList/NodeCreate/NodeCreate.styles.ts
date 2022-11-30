import { css } from '@emotion/react';

export const styles = {
  wrapper: css`
    position: relative;
    z-index: 5;
    display: grid;
    place-items: center;
    width: 360px;
  `,
  overlay: css`
    position: fixed;
    z-index: 4;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
  `,
  overlayVisible: css`
    visibility: visible;
    opacity: 1;
  `,
};
