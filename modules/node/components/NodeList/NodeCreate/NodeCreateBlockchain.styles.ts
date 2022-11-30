import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: absolute;
    z-index: 2;
    top: 44px;
    left: 50%;
    translate: -50% 0;
    width: 360px;
    max-width: 360px;
    min-width: 360px;
    min-height: 200px;
    background: #3b403e;
  `,
  button: (theme: ITheme) => css`
    background: transparent;
    width: 100%;
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 16px;
    text-align: left;
    border: 0;
    color: ${theme.colorText};
    cursor: pointer;
    font-size: 14px;

    :nth-child(odd) {
      background: rgba(0, 0, 0, 0.2);
    }

    &:hover {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
    }
  `,
};
