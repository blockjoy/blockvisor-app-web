import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    min-width: 0;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
  `,
  select: (theme: ITheme) => css`
    background: transparent;
    color: ${theme.colorText};
    height: 64px;
    padding-left: 8px;
    padding-right: 24px;
    border: 0;
    width: 100%;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    cursor: pointer;

    :hover,
    :active,
    :focus {
      box-shadow: none;
    }
  `,
  nativeSelect: css`
    @media ${breakpoints.fromMed} {
      display: none;
    }
  `,
  customSelect: css`
    @media ${breakpoints.toMed} {
      display: none;
    }
  `,
  dropdown: css`
    top: 54px;
    right: 5px;
    left: 0;
    overflow: hidden;
    @media ${breakpoints.toMed} {
      display: none;
    }
  `,
  dropdownInner: (items: number) => css`
    max-height: ${items * 40}px;
  `,
  icon: (theme: ITheme) => css`
    position: absolute;
    top: 50%;
    right: 10px;
    translate: 0 -50%;
    rotate: 90deg;
    pointer-events: none;

    path {
      fill: ${theme.colorLabel};
    }
  `,
  iconActive: css`
    rotate: -90deg;
  `,
  createButton: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    border-top: 1px solid ${theme.colorBorderGrey};
    border-bottom: 1px solid transparent;
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    padding: 12px;
    gap: 12px;
    color: ${theme.colorDefault};
    font-size: 12px;
    cursor: pointer;

    svg {
      width: 8px;
      height: 8px;
    }

    :hover {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
      border-color: ${theme.colorPrimary};

      & path {
        fill: ${theme.colorPrimaryText};
      }
    }
  `
};