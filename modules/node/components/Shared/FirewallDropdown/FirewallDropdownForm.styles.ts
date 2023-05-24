import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    gap: 8px;
    margin-bottom: 10px;

    input {
      flex: 1 1 auto;
      background: transparent;
      border: 1px solid ${theme.colorBorderGrey};
      border-radius: 4px;
      height: 38px;
      min-width: 0;
      padding: 0 8px;
      font-size: 16px;
      outline: none;
      color: ${theme.colorText};
      transition: 0.3s;
    }

    input:focus {
      border-color: ${theme.colorDefault};
    }

    input:last-child {
      flex: 1 1 auto;
      max-width: 600px;
    }
  `,
  validation: (theme: ITheme) => css`
    color: ${theme.colorDanger};
    margin-left: 8px;
  `,
  submit: (theme: ITheme) => css`
    flex: 1 1 auto;
    border: 0;
    border-radius: 4px;
    padding: 0 16px;
    background: ${theme.colorAccent};

    @media ${breakpoints.fromXLrg} {
      display: none;
      position: absolute;
    }

    :disabled {
      color: ${theme.colorPrimaryText};
      opacity: 0.3;
    }
  `,
};
