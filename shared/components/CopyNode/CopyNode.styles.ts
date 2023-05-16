import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  base: (theme: ITheme) => css`
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: ${theme.colorLabel}
    margin-left: 6px;
    margin-top: -2px;

    :hover,
    :active {
      color: ${theme.colorText}
    }
  `,
  text: (theme: ITheme) => css`
    font-size: 18px;
    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${theme.colorText};

    @media ${breakpoints.toLrg} {
      max-width: 140px;
    }
  `,
};
