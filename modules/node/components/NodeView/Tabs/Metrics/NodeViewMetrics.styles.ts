import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    padding-top: 20px;
    overflow: auto;

    @media ${breakpoints.toMed} {
      padding-bottom: 20px;
    }
  `,
};
