import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    position: sticky;
    z-index: 3;
    top: 0;

    display: flex;
    align-items: center;
    background: #2a2c2b;
    height: 72px;

    h1 {
      font-size: 18px;
    }
  `,
  wrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media ${breakpoints.toXlrg} {
      padding-left: 56px;
    }
  `,
  actions: css``,
};
