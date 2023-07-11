import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    flex: 0 0 200px;
    max-width: 200px;

    @media ${breakpoints.toMed} {
      display: none;
    }
  `,
};
