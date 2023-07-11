import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  base: (theme: ITheme) => css`
    position: sticky;
    z-index: 3;
    top: 0;
    display: flex;
    align-items: center;
    background: #2a2c2b;
    height: 72px;
    min-height: 72px;
    max-height: 72px;
    border-bottom: 1px solid ${theme.colorBorder};

    h1 {
      font-size: 18px;
      margin-right: auto;
    }

    @media ${breakpoints.toXlrg} {
      padding-left: 36px;
    }
  `,
  wrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  breadcrumb: css`
    display: flex;

    @media ${breakpoints.toXlrg} {
      max-width: 240px;
    }
  `,
  button: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;

    p {
      color: ${theme.colorDefault};
    }

    svg > path {
      fill: ${theme.colorLabel};
    }

    :is(p, path) {
      transition: 0.3s;
    }

    :hover {
      p {
        color: ${theme.colorText};
      }

      svg path {
        fill: ${theme.colorDefault};
      }
    }
  `,
  title: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 11px;
    font-size: 18px;
    color: ${theme.colorText};

    svg > path {
      fill: ${theme.colorLabel};
    }
  `,
  separator: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    color: ${theme.colorLabel};
    padding-right: 8px;
    padding-left: 8px;
    height: 22px;
  `,
  rightWrapper: css`
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    justify-content: flex-end;
  `,
};
