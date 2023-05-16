import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    padding: 0 0 40px;
    overflow: auto;

    @media ${breakpoints.toMed} {
      margin-bottom: 40px;
    }
  `,
};
