import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  section: (theme: ITheme) => css`
    position: relative;
    padding: 24px 0px;
    border-bottom: 1px solid ${theme.colorBorder};
    margin: 0 auto;
  `,
};
