import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;

    @media ${breakpoints.fromXLrg} {
      display: flex;
      flex-direction: row;
      padding: 0 24px 0 0;
      flex: 1 1 auto;
    }
  `,
  gridWrapper: css`
    width: 100%;
  `,
  listWrapper: (theme: ITheme) => css`
    @media ${breakpoints.fromXLrg} {
      position: static;
      flex: 1 1 auto;
      margin-left: 0;
      padding: 0 0 20px;
    }
  `,
  endMessage: css``,
  launchNodeLink: (theme: ITheme) => css`
    position: relative;
    display: inline-block;
    color: ${theme.colorDefault};

    :hover {
      color: ${theme.colorText};

      ::after {
        opacity: 1;
        background: ${theme.colorText};
      }
    }

    ::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 1px;
      background: ${theme.colorDefault};
      opacity: 0;
      transition: 0.2s;
    }
  `,
};
