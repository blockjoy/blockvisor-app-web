import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    padding: 20px;
    min-width: 480px;
  `,
  tabHeader: (theme: ITheme) => css`
    display: flex;
    border-bottom: 1px solid ${theme.colorBorder};
    margin-bottom: 20px;
  `,
  tabButton: (theme: ITheme) => css`
    display: flex;
    height: 44px;
    background: transparent;
    color: ${theme.colorLabel};
    border: 0;
    padding: 4px 20px 0;
    border-bottom: 4px solid transparent;
    cursor: pointer;

    :hover {
      color: ${theme.colorDefault};
    }
  `,
  tabButtonActive: (theme: ITheme) => css`
    color: ${theme.colorText};
    border-bottom-color: ${theme.colorDefault};
    cursor: default;

    :hover {
      color: ${theme.colorText};
      border-bottom-color: ${theme.colorDefault};
    }
  `,
  tabWrapper: css`
    position: relative;
    overflow: hidden;
    height: 400px;
  `,
  tabInner: css`
    position: absolute;
    display: flex;
    transition: 0.5s;
  `,
  tab: css`
    width: 440px;
  `,
};
