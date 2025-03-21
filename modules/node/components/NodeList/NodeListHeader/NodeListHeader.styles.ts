import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: sticky;
    z-index: 3;
    top: 71px;
    flex: 1 1 auto;
    display: flex;
    gap: 28px;
    justify-content: flex-start;
    align-items: center;
    height: 72px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${theme.colorBorder};
    background: ${theme.colorBackground};
  `,
  listTypePicker: css`
    display: flex;
    margin-left: auto;

    @media ${breakpoints.toXlrg} {
      display: none;
      position: absolute;
    }
  `,
  filterToggle: css`
    background: transparent;
    border: 0;
    cursor: pointer;
    display: flex;
    padding: 0;

    path,
    span {
      transition: 0.3s;
    }

    path {
      fill: rgba(255, 255, 255, 0.3);
    }

    :hover {
      > span {
        color: rgba(255, 255, 255, 0.7);
      }
      path {
        fill: rgba(255, 255, 255, 0.7);
      }
    }
  `,
  total: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    flex: 1 1 auto;
    text-align: right;
    font-size: 13px;
    white-space: nowrap;
  `,
  totalValue: (theme: ITheme) => css`
    color: ${theme.colorText};
  `,
  iconButton: (theme: ITheme) => css`
    display: block;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 0 4px;

    & path {
      fill: ${theme.colorLabel};
    }
  `,
  iconButtonActive: (theme: ITheme) => css`
    & path {
      fill: ${theme.colorText};
    }
  `,
  count: css`
    line-height: 1.2;
  `,
};
