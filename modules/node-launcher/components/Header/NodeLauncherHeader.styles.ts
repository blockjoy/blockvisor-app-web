import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  header: (theme: ITheme) => css`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${theme.colorBorder};
    min-height: 80px;
    gap: 20px;
  `,
  back: (theme: ITheme) => css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background-color: ${theme.colorHover};
    color: ${theme.colorTextGrey};
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    :hover {
      background-color: ${theme.colorBorder};
    }

    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }
  `,
  title: css`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;
  `,
  subtitle: css`
    font-size: 16px;
  `,
  content: css`
    margin-left: auto;
  `,
};
