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
    padding: 20px 0;

    @media ${breakpoints.toLrg} {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 16px;
      padding: 20px 0;
      min-height: auto;
    }
  `,
  title: css`
    min-width: 0;
  `,
  name: css`
    display: flex;
    flex-direction: column;
    min-width: 0;

    @media ${breakpoints.toLrg} {
      width: 100%;
    }

    @media ${breakpoints.fromLrg} {
      max-width: 600px;
    }
  `,
  content: css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    width: 100%;
  `,
  tags: css`
    visibility: visible;
    width: auto;

    @media ${breakpoints.fromLrg} {
      max-width: 400px;
    }

    @media ${breakpoints.fromXLrg} {
      max-width: 100%;
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
    align-items: center;
    gap: 12px;
    white-space: nowrap;

    @media ${breakpoints.toLrg} {
      gap: 6px;
      flex-wrap: wrap;
      max-width: 100%;
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
  blockchainIcon: css`
    display: grid;
    place-items: center;
    border-radius: 50%;

    > span {
      width: 40px;
      height: 40px;
    }
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
  tagsDropdownWrapper: css`
    flex: 0 0 auto;
  `,
  tagsDropdown: (theme: ITheme) => css`
    border-radius: 4px;
    width: 32px;
    height: 32px;
    padding: 0;
    display: grid;
    place-items: center;

    :active {
      box-shadow: none;
    }

    :hover {
      background: ${theme.colorInput};
      box-shadow: none;
    }

    :hover svg > :is(path, rect) {
      color: ${theme.colorText};
    }

    svg {
      position: absolute;
      height: 20px;
      width: 20px;
    }
  `,
};
