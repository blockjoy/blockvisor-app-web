import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  base: (theme: ITheme) => css`
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: ${theme.colorLabel};
    padding-right: 12px;

    :hover,
    :active {
      color: ${theme.colorText};
    }
  `,
  text: (theme: ITheme) => css`
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${theme.colorText};
    max-width: 60px;

    @media ${breakpoints.fromMed} {
      max-width: 220px;
    }

    @media ${breakpoints.fromXLrg} {
      max-width: 100%;
    }
  `,
};
