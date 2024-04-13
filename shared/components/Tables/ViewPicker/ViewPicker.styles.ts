import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

const baseButton = (theme: ITheme) => css`
  display: grid;
  place-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 0 4px;
  border-radius: 6px;

  path {
    fill: ${theme.colorLabel};
  }

  &:hover,
  &:active,
  &:focus,
  :hover:not(.active),
  :active:not(.active) {
    background: ${theme.colorActive};

    path {
      fill: ${theme.colorText};
    }
  }
`;

export const styles = {
  dropdownButton: (theme: ITheme) => css`
    ${baseButton(theme)};
    height: 30px;
    width: 30px;
  `,

  iconButton: (theme: ITheme) => css`
    ${baseButton(theme)};
    height: 44px;
    width: 44px;

    &.active {
      background: ${theme.colorActive};

      path {
        fill: ${theme.colorText};
      }
    }

    :hover:not(.active),
    :active:not(.active) {
      opacity: 0.4;
    }
  `,
  dropdownMenu: css`
    top: 36px;
    left: 0;
    right: auto;
    overflow: hidden;
    max-width: 80px;
    min-width: 80px;
  `,
  dropdownView: css`
    display: flex;
    align-items: center;

    @media ${breakpoints.fromXLrg} {
      display: none;
    }
  `,
  listView: css`
    display: flex;
    gap: 4px;
    justify-content: flex-end;

    @media ${breakpoints.toXlrg} {
      display: none;
    }
  `,
  itemLabel: css`
    position: relative;
    margin-left: -34px;
    padding-left: 34px;
    line-height: 1;
  `,
};
