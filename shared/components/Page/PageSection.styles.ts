import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  sectionBorder: (theme: ITheme) => css`
    border-bottom: 1px solid ${theme.colorBorder};
  `,
  section: css`
    position: relative;
    padding: 0 0 24px;
    margin: 0 auto;
  `,
};
