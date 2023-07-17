import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  header: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    color: ${theme.colorDefault};
    font-size: 16px;

    @media ${breakpoints.fromMed} {
      padding-right: 20px;
    }
  `,
};
