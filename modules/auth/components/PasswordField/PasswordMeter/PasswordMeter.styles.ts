import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  tooltip: (theme: ITheme) => css`
    @media ${breakpoints.fromXLrg} {
      position: absolute;
      z-index: 4000;
      top: 50%;
      right: calc(100% + 22px);
      min-width: 300px;
      transform: translate(10px, -50%);
      animation: tooltips-horz 300ms ease-out forwards;

      ::before {
        content: '';
        width: 18px;
        height: 18px;
        background-color: ${theme.colorLightGrey};
        position: absolute;
        z-index: 11;
        top: 50%;
        right: -17px;
        transform: translate(-9px, -9px) rotate(45deg);
      }
    }

    @keyframes tooltips-horz {
      to {
        transform: translate(0, -50%);
      }
    }
  `,
  tooltipTop: css`
    @media ${breakpoints.fromXLrg} {
      top: calc(50% + 15px);
    }
  `,
  tooltipContainer: (theme: ITheme) => css`
    padding: 7px 3px;
    font-size: 12px;

    @media ${breakpoints.fromXLrg} {
      background-color: ${theme.colorLightGrey};
      box-shadow: 0 0 10px rgb(0 0 0 / 10%);
      padding: 20px;
      font-size: 14px;
    }

    line-height: 20px;
    color: ${theme.colorText};
    border-radius: 8px;
  `,
  summary: css`
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 10px;

    @media ${breakpoints.fromXLrg} {
      flex-direction: column;
    }
  `,
  title: css`
    font-weight: 600;
  `,
  hintsContent: css`
    display: flex;
    flex-flow: row wrap;
    gap: 5px;
  `,
  hint: (theme: ITheme) => css`
    padding: 3px 10px;
    background: ${theme.colorInput};
    border-radius: 10px;

    @media ${breakpoints.fromXLrg} {
      background: ${theme.colorCard};
    }
  `,
  hintDisabled: (theme: ITheme) => css`
    opacity: 0.5;
    color: ${theme.colorTextGrey};
    text-decoration: line-through;
  `,
  meter: (passwordStrength: number) => (theme: ITheme) =>
    css`
      height: 3px;
      background-color: ${theme.colorText};
      border-radius: 3px;
      margin: 7px auto;
      display: flex;
      width: 100%;

      ::before {
        content: '';
        background-color: ${[
          theme.colorDanger,
          theme.colorDanger,
          theme.colorNote,
          theme.colorNote,
          theme.colorPrimary,
        ][passwordStrength - 1] || ''};
        height: 100%;
        width: ${(passwordStrength / 5) * 100}%;
        display: block;
        border-radius: 3px;
        transition: width 0.3s;
      }
    `,
};
