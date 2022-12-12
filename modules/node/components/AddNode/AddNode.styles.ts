import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  header: (theme: ITheme) => css`
    padding: 16px 0 16px;
    margin: 0 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
    padding: 16px;
  `,
  description: css`
    max-width: 280px;
  `,
  buttonWrapper: css`
    text-align: right;
  `,
};
