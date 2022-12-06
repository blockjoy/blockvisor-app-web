import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  sectionBorder: (theme: ITheme) => css`
    border-bottom: 1px solid ${theme.colorBorder};
  `,
  section: css`
    position: relative;
    padding: 24px 0;
    margin: 0 auto;
  `,
  sectionNoTopPadding: css`
    padding-top: 0;
  `,
};
