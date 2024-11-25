import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: absolute;
    top: calc(100% + 3px);
    left: 0;
    z-index: 2;
    max-width: 200px;
    min-width: 200px;
    background-color: ${theme.colorBorder};
    box-shadow: 0 0 10px ${rgba(theme.colorDark, 0.3)};
    border-radius: 4px;
    padding: 10px;
    text-transform: none;
  `,
  title: (theme: ITheme) => css`
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 12px;
    color: ${theme.colorDefault};
  `,
  item: (theme: ITheme) => css`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    font-size: 14px;

    :hover {
      background-color: ${rgba(theme.colorText, 0.1)};
    }
  `,
};
