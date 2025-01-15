import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  li: (isDragged?: boolean, isDragging?: boolean) => (theme: ITheme) =>
    css`
      display: flex;
      position: relative;
      align-items: center;
      gap: 10px;
      border-radius: 8px;
      padding-left: 5px;
      padding-right: 10px;
      cursor: move;

      ${isDragged &&
      `
      background-color: ${theme.colorBorder};
      z-index: 2;
      opacity: 1;
      `}
      ${!isDragging &&
      `
      :hover {
        background-color: ${theme.colorBorder};
      }
      `}
    `,
  moveHandle: css`
    cursor: move;
  `,
};
