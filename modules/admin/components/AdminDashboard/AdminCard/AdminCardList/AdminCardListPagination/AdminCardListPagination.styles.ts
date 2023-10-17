import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  pagination: css`
    display: flex;
    gap: 4px;
  `,

  paginationButton: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    padding: 0;
    border: 0;
    border-radius: 3px;
    background: #262528;
    color: #f9f9f9;
    font-size: 13px;
    cursor: pointer;

    &.active {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
    }

    &:disabled {
      opacity: 0.25;
    }
  `,
};
