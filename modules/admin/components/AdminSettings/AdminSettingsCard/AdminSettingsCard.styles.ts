import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  card: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 30px 24px;
    border-radius: 6px;
    border: 1px solid ${theme.colorBorderGrey};
  `,
  cardTitle: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 16px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${theme.colorBorderGrey};
  `,
};
