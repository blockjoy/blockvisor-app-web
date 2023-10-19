import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { rgba } from 'polished';

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
    background: ${theme.colorCard};
    color: #f9f9f9;
    font-size: 13px;
    cursor: pointer;

    :not(.active) {
      opacity: 0.7;
    }

    :hover:not(.active, :disabled) {
      opacity: 1;
    }

    &.active {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
    }

    &:disabled {
      opacity: 0.25;
      cursor: default;
    }
  `,
};
