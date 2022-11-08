import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: sticky;
    top: 0;
    flex: 0 0 200px;
    width: 200px;
    height: 400px;
    padding-right: 20px;
  `,
  header: css`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 120px;
    color: rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 10px;
    margin-bottom: 10px;

    & path {
      fill: rgba(255, 255, 255, 0.3);
    }
  `,
  label: (theme: ITheme) => css`
    display: block;
    color: ${theme.colorDefault};
    margin-bottom: 16px;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
  `,
  filters: css`
    padding: 10px 10px 0 0;
  `,
  checkboxList: css`
    display: grid;
    gap: 8px;
    margin-bottom: 10px;
    padding-bottom: 16px;
    max-height: 106px;
    overflow: hidden;
  `,
  checkboxListShowAll: css`
    max-height: 20000px;
  `,
  checkboxRow: (theme: ITheme) => css`
    display: flex;
    gap: 10px;
    font-size: 14px;
    color: ${theme.colorDefault};
  `,
  showMore: (theme: ITheme) => css`
    background: transparent;
    padding: 0;
    border: 0;
    cursor: pointer;
    display: block;
    color: ${theme.colorLabel};
    text-decoration: underline;
    font-size: 13px;
    margin-bottom: 20px;

    :hover {
      color: ${theme.colorDefault};
    }
  `,
};
