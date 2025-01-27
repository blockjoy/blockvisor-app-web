import { css } from '@emotion/react';

export const styles = {
  wrapper: css`
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  `,

  formField: css`
    margin-bottom: 0;

    label + div {
      margin-bottom: 0;
    }
  `,
  label: css`
    grid-column: span 2;
    max-width: calc(50% - 7.5px);
  `,
  permissions: css`
    grid-column: span 2;
  `,
};
