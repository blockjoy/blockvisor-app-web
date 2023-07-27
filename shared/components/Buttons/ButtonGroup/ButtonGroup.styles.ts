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
  extended: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
    gap: 8px;
  `,
  flex: css`
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
  `,
};
