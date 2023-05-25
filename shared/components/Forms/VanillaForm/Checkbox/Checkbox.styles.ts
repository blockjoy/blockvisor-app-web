import { css } from '@emotion/react';
import { typo } from 'styles/utils.typography.styles';

export const styles = {
  base: css`
    min-width: 0;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--color-text-3);
    cursor: pointer;
    user-select: none;
    ${typo.small}

    &::before {
      flex: 0 0 16px;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid var(--color-border-2);
      background-color: var(--color-input-background);
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 8px;
    }
  `,
  input: css`
    &::before {
      border: 1px solid var(--color-utility-success);
      background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m1 5 2 2 4-6' stroke='%2385F550' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
  `,
  disabled: css`
    opacity: 0.4;
    cursor: not-allowed;
  `,
};
