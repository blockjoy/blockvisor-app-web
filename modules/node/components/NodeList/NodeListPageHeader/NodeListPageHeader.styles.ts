import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  endBlock: css`
    flex: 0 0 100px;
  `,
  pageTitle: css`
    @media ${breakpoints.toMed} {
      display: none;
    }
  `,
  listTypePicker: css`
    display: flex;
    justify-content: flex-end;

    @media ${breakpoints.toMed} {
      display: none;
    }
  `,
  nodeListPageHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
  iconButton: (theme: ITheme) => css`
    display: block;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 0 4px;
    height: 44px;
    width: 44px;
    border-radius: 6px;

    & path {
      fill: ${theme.colorLabel};
    }
  `,
  iconButtonActive: (theme: ITheme) => css`
    background: #3b403e;
    & path {
      fill: ${theme.colorText};
    }
  `,
};
