import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  loadingButton: css`
    min-width: 200px;
  `,
  header: (theme: ITheme) => css`
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    color: ${theme.colorDefault};
    font-size: 18px;

    @media ${breakpoints.fromXLrg} {
      justify-content: flex-start;
    }
  `,
};
