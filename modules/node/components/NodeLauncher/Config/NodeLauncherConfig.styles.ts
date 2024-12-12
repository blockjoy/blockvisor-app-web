import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: () => css`
    padding: 10px;
    flex: 1 1 400px;

    @media ${breakpoints.fromXLrg} {
      padding: 10px 24px;
    }
  `,
  buttons: (theme: ITheme) => css`
    padding: 20px 30px;
    border-top: 1px solid ${theme.colorBorder};
  `,
  firewall: css`
    margin-bottom: 12px;
  `,
};
