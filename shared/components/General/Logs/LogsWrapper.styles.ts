import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    background-color: ${rgba(theme.colorTooltip || '#191b1a', 0.5)};
    border-radius: 6px;
    padding: 20px;
  `,
};
