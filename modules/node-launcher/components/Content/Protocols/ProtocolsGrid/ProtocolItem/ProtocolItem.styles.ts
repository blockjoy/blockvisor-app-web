import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (color?: string) => (theme: ITheme) =>
    css`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      padding: 25px 20px;
      border: 1px solid ${theme.colorBorder};

      border-radius: 8px;
      cursor: pointer;
      transition: 0.15s;

      text-align: center;
      background: radial-gradient(
        400px circle at 0 0,
        ${rgba(theme.colorPrimary || '#bff589', 0)},
        transparent 0%
      );

      &:hover,
      &.focus {
        border-color: ${rgba(color || theme.colorPrimary, 0.14) ??
        theme.colorPrimary};
        box-shadow: 0px 0px 0px 2px
          ${rgba(color || theme.colorPrimary, 0.07) ?? theme.colorPrimary};

        &::before {
          opacity: 1;
        }
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        background: radial-gradient(
          500px circle at var(--xPos) var(--yPos),
          ${rgba(color ?? theme.colorPrimary, 0.21)},
          transparent 35%
        );
        opacity: 0;
        transition: all 0.15s ease-in-out;
      }

      p {
        font-weight: 400;
        font-size: 18px;
        color: ${rgba(theme.colorText || '#ffffff', 0.7)};
      }

      &.active {
        background: ${rgba(theme.colorLightGrey || '#ffffff', 0.1)};
        background-color: ${theme.colorPrimary};
      }

      &.active {
        p {
          color: ${theme.colorPrimaryText};
        }
      }
    `,
  content: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 20px;
    transition: all 0.25s;
    position: relative;
  `,
};
