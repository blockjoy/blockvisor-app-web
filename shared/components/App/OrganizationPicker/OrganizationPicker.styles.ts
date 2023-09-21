import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: relative;

    p,
    path {
      transition: 0.3s;
    }

    :is(:hover, :focus) p {
      color: ${theme.colorText};
    }

    :is(:hover, :focus) path {
      fill: ${theme.colorText};
    }
  `,
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
    padding: 12px;
    background: rgb(0 0 0 / 10%);
    font-size: 12px;
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
    padding-right: 18px;
    border: 0;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    cursor: pointer;
  `,
  selectText: (maxWidth?: string) => (theme: ITheme) =>
    css`
      flex: 1 1 auto;
      min-width: 0;
      max-width: ${maxWidth || '200px'};
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 8px;
      line-height: 1.8;
      font-size: 16px;
      color: ${theme.colorDefault};
    `,
  dropdown: (isRightAligned: boolean) => css`
    top: 44px;
    left: 0;
    max-width: 196px;
    min-width: 196px;
    width: 196px;

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
    position: absolute;
    top: 50%;
    right: 4px;
    translate: 0 -50%;
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
