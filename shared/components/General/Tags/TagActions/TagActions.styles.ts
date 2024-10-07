import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  actions: css`
    display: none;
    flex-flow: row nowrap;
    gap: 7px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 2px;
    justify-content: center;
    align-items: center;
    background-color: inherit;
    border-radius: 0 20px 20px 0;
    cursor: pointer;
  `,

  action: (theme: ITheme) => css`
    padding: 3px;
    color: ${theme.colorTertiary};

    svg path {
      fill: ${theme.colorTertiary};
    }

    &:hover,
    &:focus {
      color: ${theme.colorText};

      svg path {
        fill: ${theme.colorText};
      }
    }
  `,
  edit: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 10px;
  `,
  dropdown: css`
    top: 28px;
    left: 0;
    overflow: hidden;
    max-width: 125px;
    min-width: 125px;
  `,
  dropdownItem: css`
    padding: 7px 10px;
  `,
  dropdownButton: (theme: ITheme) => css`
    border: none;
    background: transparent;
    transition: box-shadow 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0;

    color: ${theme.colorAccent};

    svg path {
      fill: ${theme.colorAccent};
    }

    &:hover,
    &:focus {
      color: ${theme.colorText};

      svg path {
        fill: ${theme.colorText};
      }
    }
  `,
};
