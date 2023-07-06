import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0 24px;

    @media ${breakpoints.fromXLrg} {
      flex-direction: row;
      padding: 0 30px;
    }
  `,
  gridWrapper: css`
    width: 100%;
  `,
  listWrapper: (theme: ITheme) => css`
    flex: 1 1 auto;
    @media ${breakpoints.fromLrg} {
      position: static;
      margin-left: 0;
      padding: 0 20px 20px 0;
      border-right: 1px solid ${theme.colorBorder};
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
  quickEdit: (theme: ITheme) => css`
    flex: 1 1 320px;
    min-width: 320px;
    max-width: 36px;
    padding: 0 0 20px 20px;

    @media ${breakpoints.fromLrg} {
      position: sticky;
      top: 72px;
      height: 100%;
    }

    @media ${breakpoints.toLrg} {
      padding: 10px 0 10px 0;
      max-width: 100%;
      width: 100%;
      min-width: 100%;
      border-left: 0;
      border-top: 1px solid ${theme.colorBorder};
    }
  `,
};
