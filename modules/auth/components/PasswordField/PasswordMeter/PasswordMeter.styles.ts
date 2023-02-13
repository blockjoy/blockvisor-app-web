import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    padding: 2px 1px;
    @media ${breakpoints.fromLrg} {
      display: none;
    }
  `,
  mobileTitle: css`
    font-weight: 600;
    font-size: 12px;
  `,
  tooltip: (theme: ITheme) => css`
    position: absolute;
    z-index: 4000;
    top: 50%;
    right: calc(100% + 25px);
    min-width: 300px;
    transform: translateY(-50%);

    @media ${breakpoints.toLrg} {
      display: none;
    }

    ::before {
      content: '';
      width: 18px;
      height: 18px;
      background-color: ${theme.colorLightGrey};
      position: absolute;
      z-index: 11;
      top: 50%;
      right: 0;
      transform: translate(9px, -9px) rotate(45deg);
    }
  `,
  tooltipContainer: (theme: ITheme) => css`
    background-color: ${theme.colorLightGrey};
    box-shadow: 0 0 11px 0 ${rgba(theme.colorDark, 0.3)};
    padding: 20px;
    font-size: 14px;
    line-height: 20px;
    color: ${theme.colorText};
    border-radius: 8px;
  `,
  summary: css`
    margin-bottom: 15px;
  `,
  title: css`
    font-weight: 600;
  `,
  hints: css`
    list-style: disc;
    margin-left: 20px;
  `,
  hintsTitle: css`
    margin-bottom: 5px;
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
