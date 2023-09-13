import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  grid: css`
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
    padding: 0 0 20px;

    @media ${breakpoints.fromSml} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${breakpoints.fromXLrg} {
      grid-template-columns: repeat(3, 1fr);
    }

    @media ${breakpoints.fromHuge} {
      grid-template-columns: repeat(4, 1fr);
    }

    @media ${breakpoints.fromXHuge} {
      grid-template-columns: repeat(5, 1fr);
    }
  `,

  cellLeft: (theme: ITheme) => css`
    padding-top: 10px;
    width: 40px;
    min-width: 40px;

    > svg {
    }

    > svg > path {
      fill: ${theme.colorLabel};
    }
  `,
  cell: (theme: ITheme) => css`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid transparent;
    min-width: 0;
    padding: 34px 24px 38px;
    background: ${theme.colorCard};
    cursor: pointer;

    @media ${breakpoints.fromLrg} {
      :hover,
      :active {
        border-color: ${theme.colorBorder};
      }
    }
  `,
  cellNotClickable: css`
    cursor: default;
    :hover,
    :active {
      border-color: transparent;
    }
  `,
  cellCenter: css`
    flex: 1 1 auto;
    min-width: 0;
  `,
  cellHeader: css`
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 4px;
    line-height: 1.6;
    white-space: nowrap;
  `,
  cellRight: (theme: ITheme) => css`
    width: 40px;
    min-width: 40px;
    padding-top: 5px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  `,
  cellTitle: css`
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 20px;
  `,
  cellStatus: css`
    display: inline-block;
  `,
  cellEarnings: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    color: ${theme.colorLabel};
    margin-bottom: 16px;
    font-size: 13px;
    text-transform: capitalize;

    svg path {
      fill: ${theme.colorLabel};
    }
  `,
  moreIcon: css`
    rotate: 90deg;
    width: 32px;
    height: 32px;
  `,
  deleteButton: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    cursor: pointer;
    height: 40px;
    width: 40px;
    display: grid;
    place-items: center;
    padding: 0;
    border-radius: 4px;

    :hover {
      background: rgb(0 0 0 / 15%);
      path {
        fill: ${theme.colorText};
      }
    }
  `,
};
