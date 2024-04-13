import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    display: none;

    @media ${breakpoints.toXlrg} {
      display: flex;
      margin-left: 10px;
    }
  `,
  title: css`
    @media ${breakpoints.toXlrg} {
      display: flex;
      align-items: center;
      height: 30px;
      padding: 5px 12px 5px 26px;

      &::after {
        left: 10px;
      }
    }
  `,
};
