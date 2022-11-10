import { css } from '@emotion/react';

export const styles = {
  list: css`
    padding: 30px 12px;
    max-height: 360px;
    overflow-y: auto;
  `,
  listItem: css`
    padding: 8px 0px;
    border-bottom: 1px solid var(--color-border-5-o10);
  `,

  blockchain: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 8px;
    border: 1px solid transparent;
    cursor: pointer;

    &:hover,
    &:active {
      border-radius: 4px;
      border: 1px solid var(--color-primary);
      color: var(--color-primary);

      & > svg {
        opacity: 1;
      }
    }

    & > svg {
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
