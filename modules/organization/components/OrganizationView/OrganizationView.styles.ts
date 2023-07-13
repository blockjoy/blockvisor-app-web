import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    padding: 0 0 20px;
    display: flex;
    flex: 1 1 auto;

    @media ${breakpoints.toXlrg} {
      flex: 0 0 auto;
      flex-direction: column;
      gap: 50px;
    }
  `,
  leftWrapper: css`
    flex: 1 1 auto;

    @media ${breakpoints.fromXLrg} {
      padding-right: 30px;
    }
  `,
  rightWrapper: (theme: ITheme) => css`
    margin-bottom: 40px;

    table th {
      width: 110px;
    }

    @media ${breakpoints.fromXLrg} {
      flex: 0 0 380px;
      padding-left: 30px;
      margin-bottom: 0;
      margin-top: 20px;
      border-left: 1px solid ${theme.colorBorder};
    }
  `,
};
