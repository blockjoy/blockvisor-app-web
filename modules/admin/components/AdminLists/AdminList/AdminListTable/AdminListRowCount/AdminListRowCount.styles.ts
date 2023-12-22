import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  rowCount: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    font-size: 14px;
    display: flex;
    gap: 6px;

    em {
      font-style: normal;
      color: ${theme.colorText};
    }

    @media ${breakpoints.toSml} {
      display: none;
    }
  `,
  rowCountTotal: (theme: ITheme) => css`
    color: ${theme.colorText};
    font-style: normal;
  `,
};
