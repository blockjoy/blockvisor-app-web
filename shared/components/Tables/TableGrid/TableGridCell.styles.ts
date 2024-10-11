import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
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

    &:hover {
      .tags {
        visibility: visible;
      }
    }

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
  cellCenter: css`
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-flow: row wrap;
    gap: 6px;
  `,
  cellHeader: css`
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    line-height: 1.6;
    white-space: nowrap;
  `,
  cellRight: css`
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
    padding-right: 10px;
  `,
  cellStatus: css`
    display: inline-block;
  `,
  cellTop: css`
    display: flex;
    max-width: 100%;
  `,
  cellMiddle: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    color: ${theme.colorDefault};
    font-size: 13px;
    text-transform: capitalize;
  `,
  cellBottom: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    color: ${theme.colorLabel};
    font-size: 13px;
    text-transform: capitalize;
  `,
  cellFooter: css`
    margin-top: 4px;
    width: 100%;
  `,
};
