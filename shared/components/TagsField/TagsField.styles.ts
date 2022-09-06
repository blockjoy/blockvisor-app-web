import { css } from '@emotion/react';
import { typo } from 'styles/utils.typography.styles';

export const styles = {
  wrapper: css`
    width: 100%;
    display: flex;
    gap: 8px;
    position: relative;
    flex-direction: row;
    color: var(--color-text-3);
    background-color: var(--color-input-background);
    border-radius: 4px;
    font-weight: var(--font-weight-normal);
    color: inherit;
    transition: color 0.18s var(--transition-easing-cubic),
      border-color 0.2s var(--transition-easing-cubic);
    border: 1px solid var(--color-text-5-o10);
    overflow-x: auto;
    overflow-y: visible;

    &:focus-within {
      outline: 0;
      border-color: var(--color-text-5-o30);
    }
  `,
  field: css`
    opacity: 0.5;
    width: 15ch;
    background-color: transparent;
    border-width: 0;
    border-radius: 4px;
    transition: opacity 0.15s var(--transition-easing-cubic);
    outline: 0;
    flex-grow: 1;

    &:focus {
      opacity: 1;
      color: var(--color-text-5);
    }
  `,
  error: css`
    border-color: var(--color-utility-warning);
  `,
  small: css`
    ${typo.small}
    padding: 4px 12px;
  `,
  medium: css`
    ${typo.small}
    padding: 8px 12px;
  `,
  large: css`
    ${typo.base}
    padding: 15px 12px;
  `,
  disabled: css`
    opacity: 0.4;
    cursor: not-allowed;
    user-select: none;
  `,
  multiline: css`
    flex-flow: row wrap;
  `,
};
