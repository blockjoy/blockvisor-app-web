import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  card: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 40px 20px 20px;
    border-radius: 6px;
    border: 1px solid ${theme.colorBorderGrey};
  `,
  cardLabel: (theme: ITheme) => css`
    color: ${theme.colorDefault};
  `,
  cardValue: (theme: ITheme) => css`
    font-style: normal;
    font-size: 34px;
    margin-bottom: 10px;
  `,
  search: css`
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 0;
    max-width: 400px;
  `,
  searchIcon: (theme: ITheme) => css`
    position: absolute;
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    pointer-events: none;
  `,
  searchInput: (theme: ITheme) => css`
    background: transparent;
    border: 1px solid ${theme.colorBorderGrey};
    outline: none;
    border-radius: 6px;
    height: 44px;
    width: 100%;
    color: ${theme.colorText};
    padding-left: 40px;
    padding-right: 100px;

    ::placeholder {
      color: ${theme.colorPlaceholder};
    }

    @media ${breakpoints.fromLrg} {
      font-size: 14px;
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

    :hover {
      opacity: 1;
    }
  `,
};
