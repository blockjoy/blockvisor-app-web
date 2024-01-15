import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
  `,
  dropdown: css`
    top: 54px;
    right: 0;
    left: auto;
    width: 100%;
    max-width: 200px;
  `,
  dropdownButton: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: ${theme.colorInput};
    border-radius: 6px;
    border: 0;
    padding: 0 14px 0 16px;
    height: 44px;
    color: ${theme.colorDefault};
    cursor: pointer;
    transition: 0.3s;

    svg path {
      fill: ${theme.colorDefault};
      transition: 0.3s;
    }

    :is(:hover, :active, :focus) {
      color: ${theme.colorText};
      box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.1);

      svg path {
        fill: ${theme.colorText};
      }
    }
  `,
  dropdownText: (theme: ITheme) => css`
    font-size: 14px;
    color: ${theme.colorDefault};
  `,
  icon: (theme: ITheme) => css`
    pointer-events: none;
    transition: transform 0.3s;

    svg path {
      fill: ${theme.colorLabel};
    }
  `,
  iconActive: css`
    transform: rotate(-180deg);
  `,
};
