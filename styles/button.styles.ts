import { css } from '@emotion/react';
import { breakpoints } from './variables.styles';

const small = css`
  font-size: 14px;
  line-height: 32px;
  padding: 8px 12px;
  height: 32px;
`;

const medium = css`
  font-size: 14px;
  line-height: 20px;
  font-family: var(--font-family-primary);
  padding: 8px 20px;

  @media ${breakpoints.fromSml} {
    padding: 12px 28px;
  }
`;

const root = css`
  ${medium}
  text-decoration: none;
  background-color: transparent;
  border-width: 0;
  text-align: center;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  outline: 0;
  transition: all 0.2s ease-out;
  user-select: none;
  position: relative;
  width: fit-content;

  &:active {
    transition: all 0.1s ease-out;
  }
`;

const reset = css`
  text-align: left;
  position: relative;
  display: block;
  text-decoration: none;
  background-color: transparent;
  border-width: 0;
  outline: 0;
  cursor: pointer;
  margin: unset;
  padding: unset;
  color: var(--color-text);
  height: unset;
  width: unset;
`;

const primary = css`
  ${root}
  overflow: hidden;
  background-color: var(--color-white);
  color: var(--color-text);
  transition: color 0.2s ease-out;
  border-radius: 50px;
  font-weight: 700;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    background: var(--color-primary);
    color: var(--color-textNegative);
    z-index: -1;
    transition: width 0.4s cubic-bezier(0.77, 0, 0.175, 1);
  }

  &:hover,
  &:focus {
    color: white;
    opacity: 1;
  }

  &:hover:before,
  &:focus:before {
    width: 100%;
    opacity: 1;
    transition: width 0.6s cubic-bezier(0.77, 0, 0.175, 1);
  }

  &:disabled {
    opacity: 0.3;
    background-color: var(--color-borderDark);
    cursor: not-allowed;

    &:hover,
    &:focus {
      background-color: var(--color-primary);
      color: white;
    }
  }
`;

const secondary = css`
  ${primary}
  text-transform: uppercase;

  &:hover {
    color: var(--color-backgroundDark);
    opacity: 1;
  }

  &::before {
    background: var(--color-textNegative);
  }
`;

const warning = css`
  ${root}

  padding: 0 16px;
  background-color: transparent;
  border: 1px solid var(--color-error);
  color: var(--color-error);
  transition: 0.15s all ease-in;

  @media ${breakpoints.fromMed} {
    padding: 16px 24px;
  }

  &:focus {
    background-color: var(--color-error);
    color: white;
  }

  &:hover {
    background-color: var(--color-error);
    color: white;
  }

  &:disabled {
    background-color: var(--color-backgroundLight);
    cursor: default;
  }
`;

export const button = {
  root,
  primary,
  warning,
  small,
  medium,
  reset,
  secondary,
};
