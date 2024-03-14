import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  header: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    font-size: 12px;
    padding: 12px;
    border-bottom: 1px solid ${theme.colorBorderGrey};
    user-select: none;
  `,
  label: (theme: ITheme) => css`
    position: absolute;
    top: -5px;
    left: 6px;
    padding: 0 4px;
    color: ${theme.colorDefault};
    font-size: 12px;
    padding: 12px;
    border-bottom: 1px solid ${theme.colorBorderGrey};
    user-select: none;
  `,
  activeOrg: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    width: 100%;
  `,
  orgText: css`
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    white-space: nowrap;
  `,
  select: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 10px;
    background: transparent;
    color: ${theme.colorText};
    padding: 0;
    border: 0;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    cursor: pointer;

    p,
    path {
      transition: 0.3s;
    }

    button:not(:disabled) {
      cursor: pointer;
    }

    :is(:hover, :focus):not(:disabled) p {
      color: ${theme.colorText};
    }

    :is(:hover, :focus):not(:disabled) path {
      fill: ${theme.colorText};
    }
  `,
  selectText: (maxWidth?: string) => (theme: ITheme) =>
    css`
      flex: 1 1 auto;
      min-width: 0;
      max-width: ${maxWidth || '200px'};
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.8;
      font-size: 16px;
      color: ${theme.colorDefault};
      transition: color 0.3s;
    `,
  dropdown: (isRightAligned: boolean) => css`
    top: 44px;
    left: 0;
    max-width: 200px;
    min-width: 200px;
    width: 200px;

    ${isRightAligned &&
    css`
      left: auto;
      right: 0;
    `}
  `,
  dropdownInner: css`
    max-height: 240px;

    ::-webkit-scrollbar-track {
      background: rgb(255 255 255 / 5%);
    }
  `,
  icon: (theme: ITheme) => css`
    pointer-events: none;
    transition: 0.3s;

    path {
      fill: ${theme.colorLabel};
    }
  `,
  iconActive: css`
    transform: rotate(-180deg);
  `,
  addOrg: (theme: ITheme) => css`
    padding: 0 14px;
    border-top: 1px solid ${theme.colorBorderGrey};
    margin-bottom: 10px;
  `,
};
