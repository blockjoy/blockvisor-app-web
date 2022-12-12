import { css } from '@emotion/react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    word-break: break-all;
    border-bottom: 1px solid var(--color-text-5-o10);

    @media ${breakpoints.toXlrg} {
      th {
        width: 160px;
      }
    }
  `,
  column: css`
    padding-top: 28px;
    padding-bottom: 8px;

    /* @media ${breakpoints.toXlrg} {
      padding-top: 8px;
      padding-bottom: 8px;
      display: block;
    } */
  `,
  heading: css`
    padding-right: 28px;
    font-weight: var(--font-weight-normal);
    ${typo.uppercase}
    ${typo.microlabel}
    ${colors.text3} /* @media ${breakpoints.toXlrg} {
      padding-top: 28px;
      padding-bottom: 0;
    } */
  `,
};
