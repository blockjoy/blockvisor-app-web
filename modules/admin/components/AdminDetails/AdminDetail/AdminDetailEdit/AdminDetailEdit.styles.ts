import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css``,
  row: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${theme.colorBorder};
    padding: 16px 0;

    @media ${breakpoints.toLrg} {
      flex-direction: column;
      align-items: flex-start;
    }
  `,
  label: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    font-size: 14px;
    flex: 0 0 190px;

    @media ${breakpoints.toLrg} {
      flex: 0 0 auto;
      min-height: 30px;
    }
  `,
  control: css`
    flex: 0 0 400px;

    @media ${breakpoints.toLrg} {
      flex: 0 0 auto;
      width: 100%;
    }
  `,
};
