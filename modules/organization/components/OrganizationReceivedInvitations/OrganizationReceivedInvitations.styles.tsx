import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    padding: 20px 0 20px 30px;

    @media ${breakpoints.fromXLrg} {
      border-top: 0;
    }
  `,
  header: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${theme.colorDefault};
    height: 40px;
    font-size: 20px;

    @media ${breakpoints.toXlrg} {
      padding-left: 0;
    }
  `,
  item: (theme: ITheme) => css`
    padding: 20px 0;
    border-bottom: 1px solid ${theme.colorBorder};
    line-height: 1.45;

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
