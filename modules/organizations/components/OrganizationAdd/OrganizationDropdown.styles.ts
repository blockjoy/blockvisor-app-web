import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    position: relative;
    min-width: 0;
  `,
  button: css`
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 8px 20px;
    border-radius: 4px;
    transition: all 0.1s ease-out;

    /* &:hover,
    &:focus {
      background: var(--color-overlay-background-1);
    } */
  `,
  icon: css`
    display: grid;
    place-items: center;
    flex: 0 0 30px;
    min-width: 30px;
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
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  rotateIcon: css`
    transform: rotate(90deg);
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
