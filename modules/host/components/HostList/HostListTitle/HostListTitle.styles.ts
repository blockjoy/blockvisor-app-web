import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  pageTitle: css`
    @media ${breakpoints.toHuge} {
      display: flex;
      margin-left: 10px;
    }
  `,
};
