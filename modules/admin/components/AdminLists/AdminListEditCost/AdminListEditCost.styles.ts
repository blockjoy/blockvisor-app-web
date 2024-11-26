import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  input: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    color: ${theme.colorText};
    height: 32px;
    width: calc(100% - 6px);
    outline-style: solid;
    outline-color: transparent;
    border-radius: 6px;
    padding-left: 4px;
    margin-left: 2px;

    :focus {
      outline-style: solid;
      outline-width: 2px;
      outline-color: ${theme.colorPrimary};
    }

    ::placeholder {
      color: ${theme.colorDefault};
    }
  `,
  inputInvalid: (theme: ITheme) => css`
    &:focus {
      outline-color: ${theme.colorDanger};
    }
  `,
};
