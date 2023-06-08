import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  filterBlock: (theme: ITheme) => css`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid transparent;
    cursor: pointer;
    background: ${theme.colorCard};

    :hover {
      border-color: ${theme.colorBorder};
    }
  `,
  filterBlockDisabled: css`
    cursor: not-allowed;

    label {
      cursor: not-allowed;
    }

    :hover {
      border-color: transparent;
    }
  `,
  labelHeader: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  `,
  labelText: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;

    rect,
    path {
      fill: red;
    }
  `,
  labelIcon: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    width: 10px;
    height: 10px;
    background: transparent;
    border: 0;

    rect,
    path {
      fill: ${theme.colorText};
    }
  `,
  checkboxList: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 122px;
    overflow: hidden;
  `,
  checkboxListShowAll: css`
    max-height: 20000px;
    padding-bottom: 0;
  `,
};
