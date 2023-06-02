import { css } from '@emotion/react';

export const styles = {
  wrapper: css`
    margin-top: 12px;
  `,
  default: css`
    display: grid;
    grid-template-columns: 90px 90px;
    gap: 8px;
  `,
  flex: css`
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
  `,
  inline: css`
    display: inline-flex;
    flex-flow: row nowrap;
    gap: 8px;
  `,
};
