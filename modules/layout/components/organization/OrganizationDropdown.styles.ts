import { css } from '@emotion/react';

export const styles = {
  base: css`
    position: relative;
  `,
  button: css`
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 200px;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.1s ease-out;

    &:hover,
    &:focus {
      background: var(--color-overlay-background-1);
    }
  `,
  icon: css`
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #bff589;
    color: #212423;
    font-size: 12px;
    font-weight: 500;
  `,
  orgName: css`
    color: var(--color-text-5);
    font-size: 14px;
  `,
  menu: css`
    position: absolute;
    top: 62px;
    left: 0;
    border-radius: 6px;
    padding: 16px;
    font-size: 14px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-16px);
    transition: all 0.4s;
    background: var(--color-overlay-background-2);
    border: 1px solid var(--color-overlay-background-1);
  `,
  isOpen: css`
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  `,
};
