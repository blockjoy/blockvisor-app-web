import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  headerWrapper: css`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    gap: 20px;
  `,
  header: css`
    display: flex;
    flex-direction: column;
    max-width: 100%;
  `,
  headline: css`
    font-size: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
  `,
  info: (theme: ITheme) => css`
    font-size: 10px;
    margin-top: 10px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 8px;
    color: ${theme.colorPlaceholder};
  `,
  details: css`
    margin-top: 40px;
  `,
};
