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
    margin-left: -16px;
    border-right: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromXLrg} {
      flex: 1 1 400px;
    }

    @media ${breakpoints.toXlrg} {
      display: block;
      width: calc(100% + 24px);
      max-width: calc(100% + 24px);
      min-width: calc(100% + 24px);
      max-height: 1000px;
      margin-right: -16px;
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
    left: 1px;
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
    margin: 0 0 16px 16px;
  `,
  searchBox: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid ${theme.colorBorder};
    height: 54px;
    padding-left: 29px;
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
