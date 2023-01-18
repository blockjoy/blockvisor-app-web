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
  nodeListWrapper: css`
    flex: 1 1 auto;
    @media ${breakpoints.fromLrg} {
      position: static;
      margin-left: 0;
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
