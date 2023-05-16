import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 120px;
    margin-bottom: 40px;
    max-width: 660px;

    @media ${breakpoints.toXlrg} {
      grid-template-columns: repeat(2, 1fr);
    }
  `,
  card: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: ${theme.colorCard};
    border-radius: 6px;
    border: 1px solid ${theme.colorBorder};
  `,
  cardValue: (theme: ITheme) => css`
    font-style: normal;
    font-size: 14px;
    color: ${theme.colorDefault};
  `,
  cardLabel: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 10px;
  `,
};
