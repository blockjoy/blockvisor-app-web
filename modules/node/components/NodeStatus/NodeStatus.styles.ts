import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  status: (theme: ITheme) => css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: ${theme.colorPrimary};
    font-size: 11px;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 1px;

    & path {
      fill: ${theme.colorPrimary};
    }
  `,
  statusText: css``,
  statusBorder: (theme: ITheme) => css`
    border: 1px solid ${theme.colorPrimary};
    padding: 8px 10px;
    font-size: 9px;
    border-radius: 3px;
  `,
  statusColorGreen: (theme: ITheme) => css`
    color: ${theme.colorPrimary};
    border-color: ${theme.colorPrimary};

    & path {
      fill: ${theme.colorPrimary};
    }
  `,
  statusColorRed: (theme: ITheme) => css`
    color: ${theme.colorDanger};
    border-color: ${theme.colorDanger};

    & path {
      fill: ${theme.colorDanger};
    }
  `,
  statusColorDefault: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    border-color: ${theme.colorDefault};

    & path {
      fill: ${theme.colorDefault};
    }
  `,
};
