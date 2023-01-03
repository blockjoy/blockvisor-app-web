import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    min-width: 0;
    position: relative;
    display: flex;
    align-items: center;
    padding-right: 10px;
  `,
  select: (theme: ITheme) => css`
    background: transparent;
    color: ${theme.colorText};
    height: 64px;
    padding-left: 8px;
    border: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;

    :hover,
    :active,
    :focus {
      box-shadow: none;
    }
  `,

  icon: (theme: ITheme) => css`
    rotate: 90deg;

    path {
      fill: ${theme.colorLabel};
    }
  `,
};
