import { css } from '@emotion/react';

export const styles = {
  totalWrapper: css`
    tr:last-child {
      border-bottom: none;
    }
  `,
  totalTitle: css`
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
  `,
  totalPrice: css`
    font-size: 20px;
    width: 21.43%;
  `,
};
