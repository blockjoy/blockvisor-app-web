import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    padding: 20px 0;

    @media ${breakpoints.fromLrg} {
      flex-direction: row;
      height: 100%;
    }
  `,
  content: css`
    flex: 1 1 auto;

    @media ${breakpoints.fromLrg} {
      padding: 4px 20px 20px 0;
    }
  `,
  quickEdit: (theme: ITheme) => css`
    flex: 1 1 360px;
    max-width: 360px;
    padding: 4px 0 20px 20px;
    border-left: 1px solid ${theme.colorBorder};

    @media ${breakpoints.toLrg} {
      border-left: 0;
      border-top: 1px solid ${theme.colorBorder};
      padding: 20px 0 0 0;
      max-width: 1000px;
      margin-bottom: 100px;
    }
  `,
  formHeader: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    text-transform: uppercase;
  `,
  loader: css`
    padding: 15px 0 0;
  `,
};
