import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  pagination: (theme: ITheme) => css`
    display: flex;
    gap: 4px;
    position: relative;
    padding-right: 6px;

    @media ${breakpoints.fromSml} {
      ::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        width: 1px;
        height: 16px;
        transform: translateY(-50%);
        background: ${theme.colorBorder};
      }
    }
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
