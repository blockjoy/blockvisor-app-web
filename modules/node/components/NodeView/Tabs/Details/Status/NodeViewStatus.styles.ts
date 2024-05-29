import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 152px;
    margin-bottom: 10px;
    max-width: 820px;

    @media ${breakpoints.toLrg} {
      grid-template-columns: repeat(2, 1fr);
      margin-right: 0;
    }
  `,
  card: (theme: ITheme) => css`
    min-width: 0;
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
    @media ${breakpoints.fromXHuge} {
      display: none;
    }
  `,
  cardValue: (theme: ITheme) => css`
    font-style: normal;
    font-size: 14px;
    color: ${theme.colorDefault};
    text-transform: capitalize;
    margin-bottom: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    padding: 0 20px;
    line-height: 1.6;
  `,
  cardLabel: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    color: ${theme.colorDefault};
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 10px;
    text-align: center;
    min-height: 30px;
  `,
};
