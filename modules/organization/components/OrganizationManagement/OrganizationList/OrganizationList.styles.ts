import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    padding: 20px 0;
    flex: 1 1 auto;

    @media ${breakpoints.toXlrg} {
      padding: 20px 0 30px;
    }
  `,
  header: (theme: ITheme) => css`
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    color: ${theme.colorDefault};
    height: 38px;

    @media ${breakpoints.fromXLrg} {
      justify-content: flex-start;
    }
  `,
  addIcon: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    width: 14px;
    height: 14px;
    path {
      fill: ${theme.colorText};
    }
  `,
};
