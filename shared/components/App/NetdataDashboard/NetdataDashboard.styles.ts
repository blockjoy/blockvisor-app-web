import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  iframe: css`
    border: 0;
    margin: 0;
    padding: 0;

    @media ${breakpoints.toMed} {
      height: 1000px !important;
    }
  `,
};
