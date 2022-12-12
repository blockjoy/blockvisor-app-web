import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  row: (theme: ITheme) => css`
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 0 12px 8px;

    & path {
      fill: ${theme.colorText};
    }
  `,
  blockchainName: css`
    font-size: 16px;
  `,
  buttons: (theme: ITheme) => css`
    padding-left: 12px;
    border-bottom: 1px solid ${theme.colorLightGrey};
    margin-bottom: 16px;
    padding-bottom: 10px;
    display: flex;
    overflow-x: auto;
  `,
  blockchainIcon: (theme: ITheme) => css`
    border: 1px solid ${theme.colorLabel};
    border-radius: 50%;
    padding: 4px;

    span {
      width: 16px;
      height: 16px;
    }

    svg {
      height: 100%;
      width: 100%;
    }
  `,
  createButton: (theme: ITheme) => css`
    background: #151716;
    border: 0;
    color: ${theme.colorText};
    font-size: 11px;
    font-weight: 500;
    margin-right: 8px;
    margin-bottom: 6px;
    border-radius: 2px;
    padding: 10px 10px;
    min-width: 76px;
  `,
};
