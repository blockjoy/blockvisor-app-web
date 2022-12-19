import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  button: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 0 20px;
    width: 250px;
    height: 44px;
    background: #1d1e1e;
    color: ${theme.colorPrimaryText};
    border: 0;
    border-radius: 22px;
    cursor: pointer;

    span {
      border-left: 1px solid ${theme.colorPrimary};
      padding-left: 20px;
      color: ${theme.colorText};
    }

    svg {
      height: 46%;
    }

    path {
      fill: ${theme.colorPrimary};
    }
  `,
};
