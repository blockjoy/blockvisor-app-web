import { css } from '@emotion/react';

export const styles = {
  configBlock: css`
    display: flex;
    height: 80px;

    :last-of-type {
      margin-bottom: 20px;
    }

    > label {
      margin: 0;
      flex: 1 1 120px;
    }
  `,
};
