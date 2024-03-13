import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  button: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    border-top: 1px solid ${theme.colorBorderGrey};
    border-bottom: 1px solid transparent;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px;
    gap: 12px;
    color: ${theme.colorDefault};
    font-size: 12px;
    cursor: pointer;

    path {
      fill: ${theme.colorDefault};
    }

    svg {
      width: 8px;
      height: 8px;
    }

    :hover {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
      border-color: ${theme.colorPrimary};

      & svg path {
        fill: ${theme.colorPrimaryText};
      }
    }
  `,
};
