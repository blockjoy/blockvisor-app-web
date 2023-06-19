import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    @media ${breakpoints.fromLrg} {
      padding-right: 20px;
    }
  `,
};
