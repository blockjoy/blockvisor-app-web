import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    align-items: center;

    @media ${breakpoints.toMed} {
      max-width: 240px;
    }
  `,
  title: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,
  orgPicker: css`
    display: flex;
    align-items: center;

    @media ${breakpoints.toMed} {
      display: none;
    }
  `,
  separator: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    color: ${theme.colorLabel};
    padding: 0 8px;
    height: 22px;
    font-size: 20px;
    opacity: 0.6;
  `,
};
