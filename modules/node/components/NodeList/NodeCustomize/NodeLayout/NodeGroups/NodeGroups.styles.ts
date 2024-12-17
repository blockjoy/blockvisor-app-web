import { css } from '@emotion/react';

export const styles = {
  item: css`
    display: grid;
    grid-template-columns: 1fr auto !important;
    gap: initial;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 0;
    margin-bottom: 0;
  `,
  label: css`
    pointer-events: none;
    user-select: none;
  `,
};
