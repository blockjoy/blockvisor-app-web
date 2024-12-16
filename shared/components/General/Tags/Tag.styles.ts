import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (
    bgColor: string,
    isOpen: boolean,
    isOpenDropdown?: boolean,
    minWidth?: number,
  ) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 50px;
    max-width: max-content;
    padding: 3px 10px;
    background-color: ${bgColor};
    white-space: nowrap;
    text-overflow: ellipsis;
    border-radius: 20px;
    position: relative;
    height: max-content;

    &:hover .actions {
      display: flex;
    }

    ${(isOpen || isOpenDropdown) &&
    `.actions {
      display: flex;
    }`}

    &:hover,
    &:active,
    &:focus {
      box-shadow: 0px 0px 0px 1px ${bgColor};
    }

    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }
  `,
  tagName: (theme: ITheme) => css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
    font-size: 12px;
    color: ${theme.colorText};
  `,
};
