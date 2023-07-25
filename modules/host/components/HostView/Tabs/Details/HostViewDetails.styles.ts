import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  section: css`
    @media ${breakpoints.fromXLrg} {
      padding-bottom: 40px;
    }
  `,
};
