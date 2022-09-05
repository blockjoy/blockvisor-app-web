import { css } from '@emotion/react';
import { typo } from 'styles/utils.typography.styles';

export const styles = {
  base: css`
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
    .checkbox__input:not(:disabled) + .checkbox:hover::before,
    .checkbox__input:not(:disabled) + .checkbox:focus::before,
    .checkbox__input:not(:disabled) + .checkbox:active::before {
      background-color: var(--color-text-5-o10);
    }

    .checkbox__input:disabled + .checkbox {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .checkbox__input:focus:not(:hover) + .checkbox:before {
      outline: 1px dotted #212121;
      outline: 5px auto -webkit-focus-ring-color;
    }

    .checkbox__input--touched:invalid + .checkbox::before,
    .checkbox--error::before {
      border: 1px solid var(--color-utility-warning);
    }

    .checkbox__input:checked + .checkbox::before {
      border: 1px solid var(--color-utility-success);
      background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m1 5 2 2 4-6' stroke='%2385F550' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }

    .checkbox__input:indeterminate + .checkbox::before {
      border-width: 0;
      background-image: url("data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 2'%3E%3Cpath d='M1 1h8' stroke='%23B9B9B9' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
  `,
};
