import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: sticky;
    z-index: 2;
    top: 71px;
    flex: 1 1 auto;
    display: flex;
    gap: 28px;
    align-items: center;
    height: 50px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${theme.colorBorder};
    background: ${theme.colorBackground};
  `,
  wrapperInner: css`
    @media ${breakpoints.toXlrg} {
      display: none;
    }
  `,
  listTypePicker: css`
    display: flex;
    justify-content: flex-end;
  `,
  filterToggle: css`
    background: transparent;
    border: 0;
    cursor: pointer;
    display: flex;
    padding: 0;

    path {
      fill: rgba(255, 255, 255, 0.3);
    }
  `,

  endBlock: css``,
  total: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    margin-left: auto;
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
};
