import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    h1 {
      width: 100px;
      white-space: nowrap;
    }
  `,
  spacer: css`
    width: 100px;
  `,
};
