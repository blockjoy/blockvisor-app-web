import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 152px;
    margin-bottom: 40px;
    max-width: 820px;

    @media ${breakpoints.toLrg} {
      grid-template-columns: repeat(2, 1fr);
      margin-right: 0;
    }
  `,
  card: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: ${theme.colorCard};
    border-radius: 6px;
    padding-top: 14px;
  `,
  cardOnlyShowOnMobile: css`
    @media ${breakpoints.fromXLrg} {
      display: none;
    }
  `,
  cardValue: (theme: ITheme) => css`
    font-style: normal;
    font-size: 14px;
    color: ${theme.colorDefault};
    text-transform: capitalize;
    margin-bottom: 0px;
  `,
  cardLabel: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    color: ${theme.colorLabel};
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 10px;
    text-align: center;
    min-height: 30px;
  `,
};
