import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  alert: css`
    position: relative;
    padding: 4px 12px 4px 24px;
    margin: 0;
    display: inline-flex;
    align-items: center;
    font-size: 11px;

    &::after {
      left: 10px;
    }
  `,
};
