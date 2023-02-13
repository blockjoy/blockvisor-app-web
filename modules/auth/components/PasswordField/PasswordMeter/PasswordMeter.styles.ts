import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  tooltip: (theme: ITheme) => css`
    @media ${breakpoints.fromLrg} {
      position: absolute;
      z-index: 4000;
      top: 50%;
      left: calc(100% + 25px);
      min-width: 300px;
      transform: translateY(-50%);

      ::before {
        content: '';
        width: 18px;
        height: 18px;
        background-color: ${theme.colorLightGrey};
        position: absolute;
        z-index: 11;
        top: 50%;
        left: 0;
        transform: translate(-9px, -9px) rotate(45deg);
      }
    }
  `,
  tooltipTop: css`
    @media ${breakpoints.fromLrg} {
      top: calc(50% + 15px);
    }
  `,
  tooltipContainer: (theme: ITheme) => css`
    padding: 7px 3px;
    font-size: 12px;

    @media ${breakpoints.fromLrg} {
      background-color: ${theme.colorLightGrey};
      box-shadow: 0 0 11px 0 ${rgba(theme.colorDark, 0.3)};
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

    @media ${breakpoints.fromLrg} {
      margin-bottom: 15px;
      flex-direction: column;
    }
  `,
  title: css`
    font-weight: 600;
  `,
  hints: css`
    @media ${breakpoints.toLrg} {
      display: none;
    }
  `,
  hintsTitle: css`
    margin-bottom: 5px;
  `,
  hintsContent: css`
    list-style: disc;
    margin-left: 20px;
  `,

  hintDisabled: (theme: ITheme) => css`
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
          theme.colorNote,
          theme.colorAccent,
          theme.colorAccent,
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
