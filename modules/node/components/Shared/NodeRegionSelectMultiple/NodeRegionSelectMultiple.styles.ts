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
  rowDisabled: css`
    cursor: not-allowed;

    p {
      opacity: 0.5;
    }
  `,
  scrollbar: css`
    position: relative;
    max-height: 200px;
  `,
  dropdown: css`
    width: 100%;
    top: 56px;
    overflow: visible;
  `,
  dropdownHeader: css`
    position: relative;
  `,
  dropdownEmpty: (theme: ITheme) => css`
    padding: 10px;
    color: ${theme.colorDefault};
  `,
  searchInput: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    border-bottom: 1px solid rgb(255 255 255 / 10%);
    width: 100%;
    padding: 10px;
    color: ${theme.colorText};
    outline: none;
    transition: 0.3s;

    :focus,
    :hover {
      border-bottom-color: rgb(255 255 255 / 20%);
    }

    ::placehoder {
      rgb(255 255 255 / 20%)
    }

    :is(:focus, :hover)::placeholder {
      color: rgb(255 255 255 / 40%);
    }
  `,
  ipStatus: css`
    opacity: 0;
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
