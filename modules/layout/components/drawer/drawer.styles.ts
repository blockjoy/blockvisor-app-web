import { css } from '@emotion/react';

export const styles = {
  base: css`
    position: fixed;
    z-index: 8;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
    border-left: 1px solid var(--color-overlay-background-1);
    background: var(--color-foreground-secondary);
    transform: translateX(100%);
    transition-property: transform;
    transition-duration: 0.4s;
  `,
  isOpen: css`
    transform: translateX(0);
  `,
  content: css`
    padding: 28px;
  `,
  subheader: css`
    color: #a5a8a3;
    letter-spacing: 1.5px;
    font-size: 10px;
    margin-bottom: 16px;
  `,
  header: css`
    display: flex;
    align-items: center;
    height: 56px;
    padding-left: 16px;
    padding-right: 16px;
    border-bottom: 1px solid var(--color-overlay-background-1);
    color: var(--color-text-5);
  `,
};
