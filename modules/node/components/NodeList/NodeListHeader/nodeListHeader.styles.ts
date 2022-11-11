import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: sticky;
    z-index: 2;
    top: 56px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${theme.colorBorder};
    background: ${theme.colorBackground};
  `,
  listTypePicker: css`
    display: flex;
    justify-content: flex-end;
  `,
  filterToggle: css`
    @media ${breakpoints.fromLrg} {
      display: none;
    }
  `,

  endBlock: css`
    width: 100px;
  `,
  total: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    text-align: center;
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
};
