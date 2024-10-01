import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  status: (hasBorder?: boolean) => (theme: ITheme) =>
    css`
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: ${theme.colorPrimary};
      font-size: 11px;
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: 1px;
      max-width: max-content;
      ${hasBorder &&
      css`
        width: 100%;
      `}

      & path {
        fill: ${theme.colorPrimary};
      }
    `,
  statusText: (hasBorder?: boolean) => css`
    position: relative;
    z-index: 0;
    white-space: nowrap;

    ${hasBorder &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
    `}
  `,
  statusBorder: (theme: ITheme) => css`
    border: 1px solid ${theme.colorPrimary};
    padding: 8px 10px;
    font-size: 9px;
    border-radius: 3px;
  `,
  statusLoading: (minWidth: number) => css`
    position: relative;
    overflow: hidden;
    min-width: ${minWidth + 92}px;
  `,
  statusColorGreen: (theme: ITheme) => css`
    color: ${theme.colorPrimary};
    border-color: ${theme.colorPrimary};

    svg :is(path, circle, rect) {
      fill: ${theme.colorPrimary};
    }
  `,
  statusColorRed: (theme: ITheme) => css`
    color: ${theme.colorDanger};
    border-color: ${theme.colorDanger};

    svg :is(path, circle, rect) {
      fill: ${theme.colorDanger};
    }
  `,
  statusColorDefault: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    border-color: ${theme.colorDefault};

    svg :is(path, circle, rect) {
      fill: ${theme.colorDefault};
    }
  `,
};
