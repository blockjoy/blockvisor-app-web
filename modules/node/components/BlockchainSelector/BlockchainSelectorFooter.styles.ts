import { css } from '@emotion/react';

export const styles = {
  base: css`
    font-size: 10px;
    line-height: 12px;
    color: var(--color-text-3);
    border-top: 1px solid var(--color-text-5-o10);
    padding: 12px 20px;
    display: flex;
  `,

  wrapper: css`
    display: inline-flex;
    align-items: center;
    & > svg {
      path {
        fill: var(--color-border-3);
      }
    }
  `,
  iconText: css`
    padding-left: 8px;
  `,
};
