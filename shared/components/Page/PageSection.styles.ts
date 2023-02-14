import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  sectionBorder: (theme: ITheme) => css`
    padding-bottom: 36px;
    border-bottom: 1px solid ${theme.colorBorder};
  `,
  section: css`
    position: relative;
    padding: 0 0 12px;
    margin: 0 auto;
    flex: 1 1 auto;
    min-width: 100%;
  `,
  sectionNoTopPadding: css`
    padding-top: 0;
  `,
};
