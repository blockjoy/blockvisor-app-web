import { css } from '@emotion/css';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    @media ${breakpoints.toMed} {
      margin-top: 40px;
    }
  `,
};
