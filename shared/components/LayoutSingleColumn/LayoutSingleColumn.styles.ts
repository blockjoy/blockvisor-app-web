import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    @media ${breakpoints.toMed} {
      margin-top: 40px;
    }
  `,
};
