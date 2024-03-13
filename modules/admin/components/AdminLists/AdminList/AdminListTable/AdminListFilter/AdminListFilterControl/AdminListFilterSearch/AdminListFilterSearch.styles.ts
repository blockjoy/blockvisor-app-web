import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  searchWrapper: css`
    position: relative;
  `,
  searchInput: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    border-bottom: 1px solid ${theme.colorBorderGrey};
    outline: none;
    padding: 0 12px 0 33px;
    font-size: 14px;
    height: 48px;
    width: 100%;
    color: ${theme.colorText};
    opacity: 0.7;
    transition: opacity 0.3s;

    :focus {
      opacity: 1;
    }

    ~ span svg path {
      opacity: 0.4;
      transition: 0.3s;
    }

    :focus ~ span svg path {
      opacity: 1;
    }
  `,
  searchIcon: css`
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  `,
};
