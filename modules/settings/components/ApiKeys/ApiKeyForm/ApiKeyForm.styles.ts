import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  drawer: (isSidebarOpen?: boolean) => (theme: ITheme) =>
    css`
      top: 0;
      width: 100%;
      max-width: calc(100vw - ${isSidebarOpen ? '260' : '63'}px);
      height: 100vh;

      @media ${breakpoints.toXlrg} {
        max-width: calc(100vw - 200px);
      }

      @media ${breakpoints.toLrg} {
        max-width: 90vw;
      }

      > div:nth-of-type(1) {
        height: 72px;
        background-color: ${theme.colorBackground};
        position: sticky;
        top: 0;
        z-index: 1;
      }

      > div:nth-of-type(2) {
        padding-bottom: 0;
      }

      > button {
        top: 26px;
        z-index: 1;
      }
    `,
  bottom: (theme: ITheme) => css`
    position: sticky;
    bottom: 0;
    background: ${theme.colorBackground};
    padding: 10px 0;
  `,
  error: css`
    margin-bottom: 10px;
  `,
  orgPicker: css`
    margin-bottom: 15px;
    position: relative;
    top: -10px;
  `,
};
