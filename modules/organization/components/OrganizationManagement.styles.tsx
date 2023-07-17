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
      position: sticky;
      z-index: 10;
      top: 72px;
      flex: 1 1 320px;
      max-width: 320px;
      max-height: calc(100vh - 72px);
      padding-right: 10px;
      border-right: 1px solid ${theme.colorBorder};
    }
  `,
  rightWrapper: css`
    flex: 1 1 auto;
    display: flex;

    @media ${breakpoints.toXHuge} {
      flex-direction: column;
    }
  `,
  detailWrapper: css`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;

    @media ${breakpoints.fromMed} {
      padding-left: 30px;
    }
  `,
  invitationsWrapper: (theme: ITheme) => css`
    border-top: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromMed} {
      margin-left: 30px;
    }

    @media ${breakpoints.fromXHuge} {
      flex: 1 1 200px;
      max-width: 300px;
      border-top: 0;
      border-left: 1px solid ${theme.colorBorder};
      margin-left: 30px;
    }
  `,
};
