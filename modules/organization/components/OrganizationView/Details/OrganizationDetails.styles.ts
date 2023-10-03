import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  section: css`
    margin-top: -20px;
  `,
  detailsHeaderMobile: css`
    display: none;

    @media ${breakpoints.toXHuge} {
      display: block;
    }
  `,
};
