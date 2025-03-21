import { css } from '@emotion/react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    word-break: break-all;
    border-bottom: 1px solid var(--color-text-5-o10);

    @media ${breakpoints.toSml} {
      display: flex;
      flex-direction: column;

      th {
        width: 160px;
        padding-top: 16px;
        padding-bottom: 0;
      }

      td {
        padding-top: 0;
        padding-bottom: 16px;
      }

      display: flex;
      flex-direction: column;
    }
  `,
  column: css`
    padding-top: 28px;
    padding-bottom: 8px;

    @media ${breakpoints.toSml} {
      padding-top: 16px;
      padding-bottom: 16px;
      display: block;
    }
  `,
  heading: css`
    padding-right: 28px;
    font-weight: var(--font-weight-normal);
    ${typo.uppercase};
    ${typo.microlabel};
    ${colors.text3};
  `,
};
