import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    @media ${breakpoints.fromXLrg} {
      padding-right: 20px;
    }
  `,
  row: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 16px 0;
    border-bottom: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromXLrg} {
      flex-direction: row;
      align-items: center;
      gap: 0;
      height: 72px;
      padding: 0;

      > h4 {
        width: 200px;
        flex: 0 0 200px;
      }
    }
  `,
  firewallWrapper: css`
    width: 100%;
    @media ${breakpoints.fromMed} {
      width: 400px;
    }
  `,
};
