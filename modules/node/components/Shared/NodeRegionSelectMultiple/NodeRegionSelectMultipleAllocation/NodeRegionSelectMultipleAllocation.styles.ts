import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  name: css`
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 8px;
    white-space: nowrap;
  `,
  allocation: (theme: ITheme) => css`
    border: 1px solid ${theme.colorBorder};
    border-radius: 6px;
    padding: 2px 10px 8px;
    margin-bottom: 16px;
  `,
  allocationHeader: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    font-size: 12px;
    padding: 4px 0 0;
  `,
  allocationHeaderRow: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0 8px;
  `,
  allocationRow: css`
    display: flex;
    align-items: center;
    padding: 4px 0;
  `,
  allocationInput: (theme: ITheme) => css`
    background: transparent;
    border: 1px solid ${theme.colorBorder};
    border-radius: 4px;
    width: 40px;
    height: 36px;
    outline: none;
    color: ${theme.colorText};
    text-align: center;

    :focus {
      border-color: ${theme.colorLabel};
    }
  `,
  allocationInputError: (theme: ITheme) => css`
    &,
    :focus {
      border-color: ${theme.colorDanger};
    }
  `,
  removeButton: (theme: ITheme) => css`
    background: transparent;
    margin-left: auto;
    color: ${theme.colorText};
    border: 4px solid ${theme.colorBackground};
    border-radius: 50%;
    height: 30px;
    width: 30px;
    opacity: 0.5;
    display: grid;
    place-items: center;
    padding: 0;
    cursor: pointer;
    transition: 0.3s;

    :hover {
      opacity: 1;
    }
  `,
  alert: css`
    position: relative;
    padding: 4px 12px 4px 24px;
    margin: 0;
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    white-space: nowrap;

    &::after {
      left: 10px;
    }
  `,
};
