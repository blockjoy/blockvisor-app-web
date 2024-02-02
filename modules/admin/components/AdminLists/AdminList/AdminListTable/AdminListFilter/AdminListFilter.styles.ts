import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: auto;
    margin-right: 4px;
  `,
  dropdownInner: css`
    max-height: 260px;
    min-height: 26px;
    height: 260px;

    ::-webkit-scrollbar-track {
      background: rgb(255 255 255 / 10%);
    }
  `,
  dropdownButton: (theme: ITheme) => css`
    position: relative;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 0;
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    transition: 0.3s;

    :hover {
      background: rgb(255 255 255 / 2%);
    }

    :hover path {
      fill: ${theme.colorText};
    }
  `,
  filterBadge: (theme: ITheme) => css`
    position: absolute;
    top: 2px;
    right: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 600;
    display: grid;
    place-items: center;
    color: ${theme.colorPrimaryText};
    background: ${theme.colorPrimary};
    border: 3px solid ${theme.colorBackground};
  `,
};
