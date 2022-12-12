import { css } from '@emotion/react';

export const styles = {
  base: css`
    position: relative;
  `,
  right: css`
    left: auto;
    right: 0;
  `,
  menu: css`
    position: absolute;
    z-index: 1;
    top: 40px;
    left: 0;
    font-size: 14px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-16px);
    border-radius: 4px;
    min-width: max-content;
    transition: all 0.4s;
    background-color: var(--color-overlay-background-1);
  `,
  isOpen: css`
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  `,
};
