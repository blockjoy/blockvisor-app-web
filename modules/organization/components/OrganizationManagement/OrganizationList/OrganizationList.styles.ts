import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    padding: 20px 30px 0 24px;
    flex: 1 1 auto;

    @media ${breakpoints.toXlrg} {
      padding-bottom: 30px;
    }
  `,
  header: (theme: ITheme) => css`
    color: ${theme.colorDefault};
  `,
};
