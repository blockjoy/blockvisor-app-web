import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    display: flex;

    @media ${breakpoints.toMed} {
      flex-direction: column;
    }
  `,
  leftWrapper: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;

    @media ${breakpoints.fromMed} {
      flex: 1 1 270px;
      max-width: 270px;
      max-height: calc(100vh - 72px);
      padding-right: 10px;
      border-right: 1px solid ${theme.colorBorder};
    }
  `,
  rightWrapper: css`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;

    @media ${breakpoints.fromMed} {
      padding-left: 30px;
    }
  `,
  invitationsWrapper: (theme: ITheme) => css`
    flex: 1 1 200px;
    max-width: 300px;
    border-left: 1px solid ${theme.colorBorder};
    margin-left: 30px;
  `,
};
