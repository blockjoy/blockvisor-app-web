import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    padding-right: 20px;
  `,
  row: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 16px 0;
    border-bottom: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromXLrg} {
      flex-direction: row;
      align-items: center;
      height: 72px;
      padding: 0;

      > h4 {
        width: 200px;
        flex: 0 0 200px;
      }
    }
  `,
};
