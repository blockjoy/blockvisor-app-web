import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  section: css`
    &:not(:last-child) {
      padding-bottom: 40px;
    }
  `,
  metricsTitle: css`
    @media ${breakpoints.fromXLrg} {
      display: none;
    }
  `,
};
