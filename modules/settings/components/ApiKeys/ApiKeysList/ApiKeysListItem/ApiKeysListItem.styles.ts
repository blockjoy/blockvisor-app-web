import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid ${theme.colorBorderGrey};
  `,
  header: (theme: ITheme) => css`
    display: flex;
    gap: 10px;
    width: 100%;
    padding-bottom: 15px;
    border-bottom: 1px solid ${theme.colorBorder};

    svg > path {
      fill: ${theme.colorDefault};
    }
  `,
  headline: css`
    font-size: 14px;
  `,
  date: (theme: ITheme) => css`
    font-size: 12px;
    color: ${theme.colorDefault};
  `,
  button: (theme: ITheme) => css`
    margin-left: auto;
    font-size: 12px;

    svg > path {
      fill: ${theme.colorDanger};
    }

    :hover svg path {
      fill: ${theme.colorDanger};
    }
  `,
  content: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
  `,
  permissionGroup: css`
    display: flex;
    flex-direction: row;
  `,
  permissionGroupTitle: css`
    font-size: 12px;
    text-transform: uppercase;
    min-width: 150px;

    @media ${breakpoints.toSml} {
      min-width: 100px;
    }
  `,
  permissions: css`
    display: flex;
    flex-flow: row wrap;
    gap: 4px;
  `,
  permission: css`
    font-size: 12px;
    background-color: #333;
    border-radius: 4px;
    padding: 2px 5px;
  `,
  showMore: css`
    margin-right: auto;
    font-size: 12px;
  `,
};
