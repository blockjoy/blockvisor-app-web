import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    padding: 20px 0;
    border-top: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromXLrg} {
      margin-left: 30px;
      border-top: 0;
      border-left: 1px solid ${theme.colorBorder};
    }
  `,
  header: (theme: ITheme) => css`
    display: flex;
    gap: 10px;
    padding: 0 20px;
    margin-bottom: 20px;
    color: ${theme.colorDefault};

    @media ${breakpoints.toXlrg} {
      padding-left: 0;
    }
  `,
  item: (theme: ITheme) => css`
    padding: 20px;
    border-bottom: 1px solid ${theme.colorBorder};

    @media ${breakpoints.toXlrg} {
      padding-left: 0;
    }
  `,
  buttons: css`
    display: grid;
    grid-template-columns: repeat(2, 90px);
    gap: 8px;
  `,
};
