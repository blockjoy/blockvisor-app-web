import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  id: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    overflow: hidden;
    white-space: nowrap;
    margin-left: 4px;
    font-style: normal;
    text-overflow: ellipsis;
  `,
  buttonText: css`
    max-width: 370px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.6;
  `,
};
