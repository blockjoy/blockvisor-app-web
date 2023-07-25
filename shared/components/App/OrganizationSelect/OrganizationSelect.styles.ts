import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  header: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0 10px;
    border-bottom: 1px solid ${theme.colorBorderGrey};

    h2 {
      font-size: 12px;
      color: ${theme.colorDefault};
    }
  `,
  select: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    color: ${theme.colorText};
    height: 64px;
    padding-left: 0;
    padding-right: 24px;
    border: 0;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    cursor: pointer;

    :hover,
    :active,
    :focus {
      box-shadow: none;
    }
  `,
  selectText: css`
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 16px;
    line-height: 1.8;
    text-align: left;
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
  icon: (theme: ITheme) => css`
    position: absolute;
    top: 50%;
    right: 10px;
    translate: 0 -50%;
    rotate: 90deg;
    pointer-events: none;

    path {
      fill: ${theme.colorLabel};
    }
  `,
  iconActive: css`
    rotate: -90deg;
  `,
};
