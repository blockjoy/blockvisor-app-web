import { css } from '@emotion/react';

export const styles = {
  tableRows: css`
    table tr > :is(td, th) {
      padding-bottom: 20px;
      padding-top: 20px;
      vertical-align: middle;
    }
  `,
};
