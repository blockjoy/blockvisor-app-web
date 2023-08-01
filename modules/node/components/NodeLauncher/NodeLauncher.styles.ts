import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    display: flex;
    flex: 1 1 auto;

    @media ${breakpoints.toXlrg} {
      flex-direction: column;
    }
  `,
  empty: (theme: ITheme) => css`
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    max-height: 300px;

    h2 {
      margin-bottom: 10px;
    }

    h3 {
      color: ${theme.colorDefault};
    }

    @media ${breakpoints.toXlrg} {
      display: none;
    }
  `,
};
