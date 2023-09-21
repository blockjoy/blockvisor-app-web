import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    max-width: 33%;
    max-height: calc(100vh - 72px);
    padding: 10px 16px 10px 0;
    border-right: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromXLrg} {
      flex: 1 1 400px;
      margin-left: -14px;
    }

    @media ${breakpoints.toXlrg} {
      display: block;
      max-height: 1000px;
      max-width: 100%;
      border-right: none;
      border-bottom: 1px solid ${theme.colorBorder};
      padding: 10px 0 20px;
    }

    div:hover .row:hover {
      opacity: 1;
    }
  `,
  scrollbar: css`
    flex: 1 1 auto;
    min-height: 0;
  `,
  disabledBlockchains: css`
    @media ${breakpoints.toXlrg} {
      display: none;
    }
  `,
  iconWrapper: (theme: ITheme) => css`
    display: grid;
    place-items: center;

    > span {
      width: 20px;
      height: 20px;
    }

    path {
      fill: ${theme.colorText};
    }
  `,
  searchIcon: (theme: ITheme) => css`
    position: absolute;
    top: 50%;
    left: 16px;
    width: 16px;
    height: 16px;
    translate: 0 -50%;
    pointer-events: none;

    path {
      fill: ${theme.colorLabel};
    }
  `,
  searchWrapper: css`
    position: relative;
    margin: 0 0 16px 0;
  `,
  searchBox: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid ${theme.colorBorder};
    height: 54px;
    padding-left: 48px;
    width: 100%;
    outline: none;
    color: ${theme.colorText};

    :is(:focus, :hover) ~ span path {
      fill: ${theme.colorText};
    }

    ::placeholder {
      color: ${theme.colorDefault};
    }
  `,
  skeletonWrapper: css`
    padding: 20px 16px 0;
  `,
};
