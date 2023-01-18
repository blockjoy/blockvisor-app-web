import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    padding: 20px 0;
    flex: 1 1 auto;

    @media ${breakpoints.toXlrg} {
      padding: 20px 0 30px;
    }
  `,
  header: (theme: ITheme) => css`
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    color: ${theme.colorDefault};
    height: 38px;

    @media ${breakpoints.fromXLrg} {
      justify-content: flex-start;
    }
  `,
  questionList: css`
    padding: 20 0 0;

    @media ${breakpoints.fromLrg} {
      max-width: 600px;
    }
  `,
  questionTitle: (theme: ITheme) => css`
    color: ${theme.colorText};
    margin-bottom: 10px;
  `,
  questionAnswer: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    margin: 0 0 40px;
    line-height: 1.4;
  `,
};
