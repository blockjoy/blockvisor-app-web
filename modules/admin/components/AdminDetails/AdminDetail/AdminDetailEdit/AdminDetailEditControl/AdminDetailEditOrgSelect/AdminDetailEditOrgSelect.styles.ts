import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  id: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    overflow: hidden;
    white-space: nowrap;
    max-width: 300px;
    font-style: normal;
    text-overflow: ellipsis;

    @media ${breakpoints.toLrg} {
      max-width: 200px;
    }
  `,
  name: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  `,
  buttonText: css`
    max-width: 370px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.6;

    @media ${breakpoints.toLrg} {
      max-width: calc(100vw - 70px);
    }
  `,
};
