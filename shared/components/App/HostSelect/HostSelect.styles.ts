import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  active: css`
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    white-space: nowrap;
  `,
  dropdown: css`
    top: 54px;
    right: 5px;
    left: 0;
    max-width: 100%;
    min-width: 100%;
    width: 100%;
  `,
  dropdownInner: css`
    max-height: 199px;

    ::-webkit-scrollbar-track {
      background: rgb(255 255 255 / 5%);
    }
  `,
  autoSelect: (theme: ITheme) => css`
    border-bottom: 1px solid ${theme.colorBorderGrey};
  `,
  dropdownItem: css`
    gap: 20px;
    padding: 8px 10px;

    :hover .alert {
      opacity: 1;
    }
  `,
  alert: (theme: ITheme) => css`
    position: relative;
    background: ${theme.colorInput};
    padding: 4px 12px 4px 20px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    opacity: 0;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 8px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      transform: translateY(-50%);
    }
  `,
  alertDisabled: (theme: ITheme) => css`
    &::before {
      background: ${theme.colorDanger};
    }
  `,
  alertSuccess: (theme: ITheme) => css`
    &::before {
      background: ${theme.colorPrimary};
    }
  `,
};
