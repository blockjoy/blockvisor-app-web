import { css } from '@emotion/react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  section: css`
    margin-top: -20px;
  `,
  detailsHeaderMobile: css`
    display: none;

    @media ${breakpoints.toXlrg} {
      display: block;
    }
  `,
};
