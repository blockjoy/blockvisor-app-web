import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    padding: 0 0 20px;
    display: flex;
    flex: 1 1 auto;

    @media ${breakpoints.toXHuge} {
      flex: 0 0 auto;
      flex-direction: column;
      gap: 50px;
    }
  `,
  leftWrapper: css`
    flex: 1 1 auto;
    margin-top: -20px;

    @media ${breakpoints.fromXLrg} {
      padding-right: 20px;
    }
  `,
  rightWrapper: (theme: ITheme) => css`
    margin-bottom: 40px;

    table th {
      width: 110px;
    }

    @media ${breakpoints.fromXHuge} {
      flex: 0 0 460px;
      padding-left: 20px;
      margin-bottom: 0;
      border-left: 1px solid ${theme.colorBorder};
    }
  `,
};
