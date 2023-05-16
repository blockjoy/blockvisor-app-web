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
    max-width: 100%;
    min-width: 100%;
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
    height: 40px;
    color: ${theme.colorDefault};
    cursor: pointer;

    svg path {
      fill: ${theme.colorDefault};
    }

    :hover {
      color: ${theme.colorText};

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
    rotate: 90deg;
    pointer-events: none;

    svg path {
      fill: ${theme.colorLabel};
    }
  `,
  iconActive: css`
    rotate: -90deg;
  `,
};
