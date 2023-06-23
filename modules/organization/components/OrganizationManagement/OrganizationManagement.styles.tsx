import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    display: flex;
  `,
  leftWrapper: (theme: ITheme) => css`
    flex: 0 0 300px;
    max-width: 300px;
    padding-right: 30px;
    border-right: 1px solid ${theme.colorBorder};
    /* display: flex;

    @media ${breakpoints.toXlrg} {
      flex-direction: column;
    } */
  `,
  rightWrapper: css`
    flex: 1 1 auto;
  `,
};
