import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  list: css`
    padding: 30px 12px;
    height: auto;
    overflow-y: auto;

    @media ${breakpoints.fromLrg} {
      height: 360px;
    }
  `,
  listItem: css`
    padding: 10px 8px 12px 8px;
    margin-top: 8px;
    border: 0.5px solid transparent;
    border-bottom: 1px solid var(--color-border-5-o10);

    &:hover,
    &:active,
    &:focus {
      cursor: pointer;
      border-radius: 4px;
      border: 0.5px solid var(--color-primary);
      color: var(--color-primary);
      outline: none;
      box-shadow: 0 0 0 0.5px var(--color-primary);

      & > svg {
        opacity: 1;
      }
    }

    & > svg {
      margin-left: auto;
      opacity: 0;
      transition: opacity 0.5s;
      path {
        fill: var(--color-border-3);
      }
    }
  `,

  blockchain: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 8px;
    border: 1px solid transparent;
    cursor: pointer;

    &:hover,
    &:active,
    &:focus {
      border-radius: 4px;
      border: 1px solid var(--color-primary);
      color: var(--color-primary);

      & > svg {
        opacity: 1;
      }
    }

    & > svg {
      margin-left: auto;
      opacity: 0;
      transition: opacity 0.5s;
      path {
        fill: var(--color-border-3);
      }
    }
  `,
  blockchainText: css`
    padding-left: 12px;
  `,
};
