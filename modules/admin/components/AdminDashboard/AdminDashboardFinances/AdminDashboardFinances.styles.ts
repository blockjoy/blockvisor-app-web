import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  card: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
    border-radius: 6px;
    border: 1px solid ${theme.colorBorderGrey};

    p {
      font-size: 34px;
    }

    svg {
      width: 22px;
      height: 22px;
    }
  `,
  label: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    font-size: 16px;
    margin-bottom: 10px;
  `,
  positive: (theme: ITheme) => css`
    color: ${theme.colorPrimary};
  `,
  negative: (theme: ITheme) => css`
    color: ${theme.colorDanger};
  `,
  value: css`
    font-size: 34px;
  `,
  subtitle: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    font-size: 16px;
    margin-top: 12px;
  `,
};
