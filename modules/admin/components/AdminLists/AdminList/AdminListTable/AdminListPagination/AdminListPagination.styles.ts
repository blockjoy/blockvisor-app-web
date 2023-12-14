import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  footer: css`
    display: flex;
    align-items: center;
    gap: 24px;
  `,
  pagination: css`
    display: flex;
    gap: 4px;
  `,
  paginationButton: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    min-width: 38px;
    height: 32px;
    padding: 0;
    border: 1px solid transparent;
    border-radius: 22px;
    background: transparent;
    color: ${theme.colorText};
    font-size: 12px;
    cursor: default;
    user-select: none;
    transition: 0.3s;

    :not(span) {
      cursor: pointer;
    }

    :not(.active) {
      opacity: 0.7;
    }

    :hover:not(span, .active, :disabled) {
      opacity: 1;
      background: ${theme.colorCard};
    }

    &.active {
      border-color: ${theme.colorPrimary};
      color: ${theme.colorPrimary};
    }

    &:disabled {
      opacity: 0.25;
      cursor: default;
    }
  `,
};
