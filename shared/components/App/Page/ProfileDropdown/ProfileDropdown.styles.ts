import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  base: css`
    margin-left: 8px;
    position: relative;
    max-width: max-content;
  `,
  button: (theme: ITheme) => css`
    border: none;
    border-radius: 6px;
    background: none;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    width: 44px;
    transition: box-shadow 0.3s;

    &:hover,
    &:active {
      box-shadow: 0px 0px 0px 2px ${theme.colorInputOutline};
    }
  `,
  dropdown: css`
    top: 52px;
    right: 0;
    overflow: hidden;
    max-width: 180px;
    min-width: 180px;
  `,
  userInfoContainer: (theme: ITheme) => css`
    border-bottom: 1px solid ${theme.colorLabel};

    :hover {
      background-color: transparent;
      cursor: default;
    }
  `,
  userInfo: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  label: (theme: ITheme) => css`
    font-size: 10px;
    color: ${theme.colorPlaceholder};
  `,
  icon: css`
    width: 12px;
    height: 12px;
  `,
};
