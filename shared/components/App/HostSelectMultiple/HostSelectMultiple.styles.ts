import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 6px;
    border: 1px solid ${theme.colorBorder};
    width: 100%;
    line-height: 1.6;
    padding: 0 10px;
    background: transparent;
    cursor: pointer;
    opacity: 0.8;
  `,
  allocation: (theme: ITheme) => css`
    border: 1px solid ${theme.colorBorder};
    border-radius: 6px;
    padding: 2px 10px 8px;
    margin-bottom: 16px;
  `,
  allocationError: (theme: ITheme) => css`
    border-color: ${theme.colorDanger};
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
    padding: 4px 0;
  `,
  allocationRow: css`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 0;
  `,
  allocationInput: (theme: ITheme) => css`
    background: transparent;
    border: 1px solid ${theme.colorBorder};
    border-radius: 4px;
    width: 40px;
    height: 36px;
    margin-left: auto;
    outline: none;
    color: ${theme.colorText};
    text-align: center;

    :focus {
      border-color: ${theme.colorLabel};
    }
  `,

  row: css`
    display: flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 10px;
    cursor: pointer;

    :hover {
      background: rgb(255 255 255 / 10%);
    }

    :hover .ip-status {
      opacity: 1;
    }
  `,
  scrollbar: css`
    max-height: 200px;
  `,
  rowDisabled: css`
    cursor: not-allowed;

    p {
      opacity: 0.5;
    }
  `,
  dropdown: css`
    width: 100%;
    top: 56px;
    overflow: visible;
  `,
  ipStatus: css`
    opacity: 0;
  `,
};
