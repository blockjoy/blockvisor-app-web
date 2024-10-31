import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    padding: 12px;
    border-radius: 10px;
    background-color: ${theme.colorBorder};
    position: absolute;
    z-index: 1;
    bottom: -5px;
    transform: translateY(100%);
    box-shadow: 0 2px 16px #0006;
  `,
  heading: (theme: ITheme) => css`
    margin-bottom: 10px;
    color: ${theme.colorPlaceholder};
  `,
  list: css`
    display: flex;
    flex-flow: row wrap;
    gap: 5px;
    min-width: 100px;
  `,
  item: (color: string) => css`
    display: flex;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${color};
  `,
  button: (theme: ITheme) => css`
    padding: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    max-height: 20px;
    line-height: 1;
    min-height: auto;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0px 0px 0px 3px ${theme.colorPlaceholder};
    }
  `,
  close: css`
    width: 16px;
    height: 16px;
    max-height: 16px;
    position: absolute;
    top: 0;
    right: 5px;
  `,
};
