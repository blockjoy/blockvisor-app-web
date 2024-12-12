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
    &:first-of-type {
      min-height: 50px;
      padding-top: 0;
      padding-bottom: 6px;
    }

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
      min-height: 72px;
      padding: 12px 0;

      > h4 {
        width: 220px;
        flex: 0 0 220px;
        align-self: stretch;
        padding-top: 18px;
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
