import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  search: css`
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 0;
    max-width: 400px;
  `,
  searchIcon: css`
    position: absolute;
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    pointer-events: none;
  `,
  searchInput: (hideSearchButton: boolean) => (theme: ITheme) =>
    css`
      background: transparent;
      border: 1px solid ${theme.colorBorderGrey};
      outline: none;
      border-radius: 6px;
      height: 44px;
      width: 100%;
      color: ${theme.colorText};
      padding-left: 40px;
      padding-right: ${hideSearchButton ? '32px' : '100px'};
      opacity: 0.8;
      transition: 0.3s;

      ::placeholder {
        color: ${theme.colorPlaceholder};
      }

      @media ${breakpoints.fromLrg} {
        font-size: 14px;
      }

      :hover,
      :focus,
      :active {
        opacity: 1;
      }

      :focus,
      :active {
        box-shadow: 0px 0px 0px 2px ${theme.colorBorderGrey};
        border-color: transparent;
      }
    `,
  searchButton: (theme: ITheme) => css`
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
    background: transparent;
    color: ${theme.colorText};
    border: 0;
    border-left: 1px solid ${theme.colorBorderGrey};
    height: 32px;
    padding: 0 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    opacity: 0.7;
    transition: 0.3s;

    :hover,
    :focus,
    :active {
      opacity: 1;
    }
  `,
  clearButton: css`
    position: absolute;
    top: 0;
    right: 4px;
    bottom: 0;
    background: transparent;
    border: 0;
    cursor: pointer;
    opacity: 0.5;
    transition: 0.3s;

    :hover {
      opacity: 1;
    }
  `,
};
