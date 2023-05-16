import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: () => css`
    padding: 10px 0;
    flex: 1 1 400px;

    @media ${breakpoints.fromXLrg} {
      padding: 10px 24px;
    }
  `,
  buttons: (theme: ITheme) => css`
    padding: 20px 30px;
    border-top: 1px solid ${theme.colorBorder};
  `,
  requiredAsterix: (theme: ITheme) => css`
    display: inline-block;
    color: ${theme.colorDanger};
    margin-left: 10px;
    translate: 0 5px;
    font-size: 20px;
  `,
};
