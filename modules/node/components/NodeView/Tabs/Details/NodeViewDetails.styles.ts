import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  section: css`
    padding-bottom: 80px;

    @media ${breakpoints.fromXLrg} {
      padding-right: 20px;
    }
  `,
};
