import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  button: (theme: ITheme) => css`
    position: relative;
    border: 0;
    border-radius: 4px;
    background: ${theme.colorInput};
    white-space: nowrap;
    display: grid;
    place-items: center;
    gap: 10px;
    font-size: 14px;
    height: 40px;
    width: 40px;
    cursor: pointer;
    transition: 0.3s;

    path,
    rect {
      fill: ${theme.colorText};
      transition: 0.3s;
    }

    :disabled {
      cursor: not-allowed;
      opacity: 0.35;
    }

    @media ${breakpoints.fromLrg} {
      path,
      rect {
        fill: ${theme.colorDefault};
      }

      :is(:hover, :active. :focus):not(:disabled) {
        color: ${theme.colorText};
        background: rgb(255 255 255 / 8%);
        box-shadow: 0px 0px 0px 2px ${theme.colorInputOutline};

        .tooltip {
          opacity: 1;
          visibility: visible;
        }

        path {
          fill: ${theme.colorText};
        }
      }
    }
  `,
  buttonDanger: (theme: ITheme) => css`
    background: ${rgba(theme.colorDanger || 'red', 0.2)};
    path {
      fill: ${theme.colorDanger};
    }

    :is(:hover, :active. :focus):not(:disabled) {
      background: ${rgba(theme.colorDanger || 'red', 0.2)};
      box-shadow: 0px 0px 0px 2px ${rgba(theme.colorDanger || 'red', 0.3)};

      path {
        fill: ${theme.colorDanger};
      }
    }
  `,
  tooltip: (theme: ITheme) => css`
    position: absolute;
    z-index: 2;
    bottom: 44px;
    left: 50%;
    transform: translateX(-50%);
    background: ${theme.colorTooltip};
    color: ${theme.colorText};
    padding: 3px 4px;
    border-radius: 4px;
    font-size: 12px;
    opacity: 0;
    visibility: hidden;

    @media ${breakpoints.toLrg} {
      display: none;
    }
  `,
};
