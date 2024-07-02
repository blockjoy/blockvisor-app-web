import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  header: (theme: ITheme) => css`
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 0;
    border-bottom: 1px solid ${theme.colorBorder};
    min-height: 100px;
    padding: 10px 0;

    @media ${breakpoints.toLrg} {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 16px;
      padding: 20px 0;
      min-height: auto;
    }
  `,
  detailsHeader: css`
    display: flex;
    gap: 10px;
    margin-bottom: 4px;

    @media ${breakpoints.toXlrg} {
      flex-direction: column;
      margin-bottom: 2px;
      font-size: 20px;
    }

    word-break: break-word;
  `,
  detailsFooter: css`
    display: flex;
    gap: 16px;
    white-space: nowrap;

    @media ${breakpoints.toLrg} {
      gap: 6px;
      flex-wrap: wrap;
      max-width: 100%;
      padding-top: 8px;
    }
  `,
  actions: css`
    display: flex;
    gap: 8px;
    margin-left: auto;

    > button {
      width: 86px;
    }

    @media ${breakpoints.toLrg} {
      margin-left: 0;
    }
  `,
  nodeId: css`
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  blockchainIcon: css`
    display: grid;
    place-items: center;
    border-radius: 50%;

    > span {
      width: 40px;
      height: 40px;
    }
  `,
  breadcrumb: css`
    display: flex;
  `,
  nodesButton: (theme: ITheme) => css`
    display: flex;
    gap: 10px;
    padding: 0;
    background: transparent;
    border: 0;
    color: ${theme.colorDefault};
    font-size: 18px;
    cursor: pointer;

    svg path {
      fill: ${theme.colorLabel};
    }

    :hover {
      color: ${theme.colorText};

      svg path {
        fill: ${theme.colorDefault};
      }
    }
  `,
  separator: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    margin-right: 8px;
    margin-left: 8px;
  `,
  nodeType: (theme: ITheme) => css`
    display: flex;
    gap: 4px;
    align-items: center;

    svg > path {
      fill: ${theme.colorDefault};
    }

    p {
      color: ${theme.colorDefault};
      font-size: 14px;
      text-transform: capitalize;
    }
  `,
  nodeStatus: css`
    display: none;
    @media ${breakpoints.fromLrg} {
      margin-left: 10px;
      display: block;
    }
  `,
};
