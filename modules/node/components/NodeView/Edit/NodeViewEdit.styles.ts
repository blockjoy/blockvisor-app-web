import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    display: grid;
    gap: 10px;

    @media ${breakpoints.toXlrg} {
      min-height: max-content;
    }
  `,
};
