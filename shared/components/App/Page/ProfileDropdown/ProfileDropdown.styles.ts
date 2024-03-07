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
    &:active,
    &:focus {
      box-shadow: 0px 0px 0px 2px ${theme.colorInputOutline};
    }
  `,
  dropdown: css`
    top: 52px;
    right: 0;
    left: auto;
    overflow: hidden;
    max-width: 180px;
    min-width: 180px;
  `,
  userInfo: (theme: ITheme) => css`
    border-bottom: 1px solid ${theme.colorLabel};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 12px;

    :hover {
      background-color: transparent;
      cursor: default;
    }

    span {
      line-height: var(--line-height-tiny);
    }
  `,
  label: (theme: ITheme) => css`
    font-size: 10px;
    color: ${theme.colorPlaceholder};
  `,
  labelSub: (theme: ITheme) => css`
    font-size: var(--font-size-tiny);
    color: ${theme.colorTextGrey};
  `,
  icon: css`
    width: 12px;
    height: 12px;
  `,
};
