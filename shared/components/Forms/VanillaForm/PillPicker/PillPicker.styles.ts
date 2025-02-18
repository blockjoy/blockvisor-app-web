import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 30px;
    width: 100%;
  `,
  wrapperNoBottomMargin: css`
    margin-bottom: 0;
  `,
  label: css`
    min-width: 80px;
    user-select: none;
  `,
  labelCompact: css`
    min-width: 40px;
  `,
  input: (theme: ITheme) => css`
    position: absolute;
    scale: 0;

    :checked + label span {
      border-color: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
      background: ${theme.colorPrimary};
      cursor: default;
      transition: none;
    }

    :disabled + label span {
      color: rgb(255 255 255 / 25%);
      border-color: rgb(255 255 255 / 5%);
      background: transparent;
      cursor: not-allowed;
    }

    :not(:disabled, :checked):is(:focus, :hover, :active) + label span {
      border-color: rgb(255 255 255 / 45%);
      color: ${theme.colorText};
      box-shadow: 0 0 0 3px rgb(255 255 255 / 5%);
      transition-property: box-shadow, border-color, color;
      transition-duration: 0.3s;
    }
  `,
  button: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    border: 1px solid rgb(255 255 255 / 24%);
    color: ${theme.colorDefault};
    padding: 0 12px;
    font-size: 14px;
    border-radius: 6px;
    cursor: pointer;
    height: 40px;
    width: 100%;
  `,
  buttonCompact: css`
    font-size: 12px;
    padding: 5px 6px;
    height: 32px;
  `,
};
