import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  mainWrapper: css`
    flex: 1 1 auto;
    display: flex;
    width: 100%;
  `,
  wrapper: css`
    display: flex;
    flex: 1 1 auto;
    min-width: 0;

    @media ${breakpoints.toXlrg} {
      flex-direction: column;
    }
  `,
  leftWrapper: (theme: ITheme) => css`
    @media ${breakpoints.fromXLrg} {
      flex: 1 1 auto;
      border-right: 1px solid ${theme.colorBorder};
    }
  `,
  rightWrapper: css`
    flex: 0 0 400px;

    @media ${breakpoints.fromXLrg} {
      position: sticky;
      top: 72px;
      height: 500px;
      flex: 1 1 320px;
      max-width: 320px;
      min-width: 320px;
      padding: 0 0 20px 20px;
    }

    @media ${breakpoints.toXlrg} {
      padding: 10px 0 10px 0;
      max-width: 100%;
      width: 100%;
      min-width: 100%;
    }
  `,
};
