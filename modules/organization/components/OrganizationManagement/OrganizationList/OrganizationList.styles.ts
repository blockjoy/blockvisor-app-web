import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    padding: 20px 30px;
    flex: 1 1 auto;

    @media ${breakpoints.toXlrg} {
      padding: 20px 24px 30px;
    }
  `,
  header: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${theme.colorDefault};
    height: 38px;
  `,
  mobileCreateButton: css`
    @media ${breakpoints.fromXLrg} {
      display: none;
    }
  `,
};
