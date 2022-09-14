import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

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
    position: relative;
    display: flex;
    align-items: center;
    height: 56px;
    padding-left: 16px;
    padding-right: 16px;
    border-bottom: 1px solid var(--color-overlay-background-1);
    color: var(--color-text-5);
  `,
  actions: css`
    border-bottom: 1px solid var(--color-overlay-background-1);
    border-top: 1px solid var(--color-overlay-background-1);
    padding: 24px;
  `,
  closeButton: (theme: ITheme) => css`
    position: absolute;
    right: 0;
    top: 50%;
    width: 56px;
    height: 56px;
    transform: translateY(-50%);
    background: transparent;
    border: 0;
    cursor: pointer;

    path {
      fill: ${theme.colorText};
    }
  `,
};
