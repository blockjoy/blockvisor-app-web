import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  cardHeader: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px solid ${theme.colorBorder};
  `,
  cardTitle: (theme: ITheme) => css`
    font-size: 16px;
  `,
  total: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 20px;
    margin: 0 20px;
    border-left: 1px solid ${theme.colorBorderGrey};
    border-right: 1px solid ${theme.colorBorderGrey};
  `,
  totalValue: (theme: ITheme) => css`
    display: block;
    font-style: normal;
    font-size: 20px;
    color: ${theme.colorText};
    text-transform: capitalize;
    line-height: 1;
    margin-bottom: 6px;
  `,
  totalLabel: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    color: ${theme.colorDefault};
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 10px;
    text-align: center;
    white-space: nowrap;
  `,
  cardIcon: (theme: ITheme) => css`
    background: ${theme.colorInput};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin-right: 16px;
  `,
  search: css`
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1 1 auto;
    min-width: 0;
    max-width: 360px;
  `,
  searchIcon: (theme: ITheme) => css`
    position: absolute;
    top: 50%;
    left: 10px;
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

    ::placeholder {
      color: ${theme.colorPlaceholder};
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
    font-size: 15px;
    font-weight: 600;
    opacity: 0.7;
    transition: 0.3s;

    :hover {
      opacity: 1;
    }
  `,
};
