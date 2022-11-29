import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  blockchainInput: (theme: ITheme) => css`
    flex: 1 1 auto;
    width: 360px;
    height: 44px;
    padding-left: 40px;
    color: ${theme.colorText};
    border: 2px solid transparent;
    outline: none;
    border-radius: 6px;
    background: #3b403e;

    :focus {
      border-color: ${theme.colorPrimary};
    }
  `,
  blockchainIcon: css`
    position: absolute;
    left: 12px;
    top: 50%;
    translate: 0 -50%;
    height: 20px;

    & path {
      fill: #7e827a;
    }
  `,
  createButton: (theme: ITheme) => css`
    position: absolute;
    top: 6px;
    right: 5px;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 4px;
    background: ${theme.colorPrimary};
  `,
};
