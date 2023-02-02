import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  base: css`
    position: relative;
    max-width: max-content;
  `,
  button: css`
    border: none;
    border-radius: 0;
    background: none;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
    color: inherit;
  `,
  dropdown: css`
    top: 52px;
    right: 0;
    overflow: hidden;
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
