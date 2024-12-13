import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ITheme } from 'types/theme';

export const generateCellStyles = (
  type?: 'th' | 'td',
  isResizing?: boolean,
  headerCell?: TableHeader,
  indexes?: {
    drag?: number | null;
    target?: number | null;
    resize?: number | null;
    col?: number;
  },
  deltaX?: number | null,
) => {
  const isResizableCell = isResizing && indexes?.resize === indexes?.col;

  return (theme: ITheme) =>
    css`
      position: relative;
      text-align: ${headerCell?.textAlign || 'left'};

      ${headerCell?.width && `width: ${headerCell?.width};`}
      ${headerCell?.minWidth && `min-width: ${headerCell?.width};`}
      ${headerCell?.maxWidth && `max-width: ${headerCell?.width};`}

      ${deltaX && `user-select: none;pointer-events: none;`}

      ${deltaX &&
      indexes?.drag !== indexes?.col &&
      `transition: all .2s ease !important;`}
      
      ${indexes?.drag !== null &&
      indexes?.drag === indexes?.col &&
      `z-index: 2;`}

       ${deltaX && indexes?.drag === indexes?.col && type === 'th'
        ? `background-color: ${theme.colorBorder}; span { color: ${theme.colorText};}`
        : `background-color: ${rgba(theme.colorPrimaryText, 0.8)};`}
      
        
      ${isResizableCell &&
      type === 'th' &&
      `background-color: ${theme.colorOverlay}; 
      
      span { color: ${theme.colorText};}

      .table-resize {
        background-color: ${theme.colorAccent};
        opacity: 1;
      }
      `}

      ${isResizing &&
      !isResizableCell &&
      type === 'th' &&
      `pointer-events: none;
      `}

      ${(deltaX || isResizing) &&
      type === 'td' &&
      `user-select: none;
        pointer-events: none;
        cursor: no-drop;
      `}

      ${isResizing &&
      `.table-resize {
        ::before {
          content: '';
          width: 40px;
          height: 100%;
          display: block;
          position: relative;
          transform: translateX(-50%);
        }
      }`}

      ${isResizableCell &&
      `&::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 2px;
        height: calc(100% + 2px);
        background: ${theme.colorBorderGrey};
        right: 0;
        transform: translateX(50%);
      }`}
    `;
};
