import { css } from '@emotion/react';

export const styles = {
  header: css`
    padding: 24px 40px 28px 40px;
  `,
  spacing: css`
    margin-bottom: 28px;
  `,
  closeButton: css`
    cursor: pointer;
    background-color: transparent;
    border-width: 0;
    padding: 0;

    & > svg {
      path {
        fill: var(--color-text-5);
      }
    }
  `,
  noOfValidators: css`
    max-width: 140px;
    margin-right: 24px;
  `,
  validatorsInput: css`
    border: 1px solid var(--color-text-2);
  `,
  hostSelect: css`
    flex: 1;
  `,
  content: css`
    padding: 0 40px 40px 40px;
  `,
  description: css`
    max-width: 280px;
  `,
  buttonWrapper: css`
    text-align: right;
  `,
};
