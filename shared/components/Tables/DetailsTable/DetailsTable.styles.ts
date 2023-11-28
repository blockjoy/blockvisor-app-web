import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  base: (theme: ITheme) => css`
    th {
      width: 200px;
      vertical-align: top;
      padding-top: 35px;
    }

    @media ${breakpoints.toSml} {
      th {
        padding-top: 20px;
      }
    }

    td {
      text-overflow: ellipsis;
      line-height: 1.6;
    }
  `,
};
