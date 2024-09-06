import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    align-items: center;
  `,
  wrapperEditable: css`
    @media ${breakpoints.fromXLrg} {
      cursor: pointer;

      .edit-toggle {
        opacity: 0;
      }

      :hover .edit-toggle {
        opacity: 1;
      }
    }
  `,
  input: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    background: transparent;
    font-size: 24px;
    outline: none;
    min-height: 30px;
    min-width: 0;
    margin-right: 11px;
    color: ${theme.colorText};
    -webkit-text-fill-color: ${theme.colorText};
    opacity: 1;
    border: 0;
    padding: 0;
    border-radius: 0;
    resize: none;
    cursor: text;
    word-wrap: break-word;
    word-break: break-all;

    :disabled {
      -webkit-text-fill-color: ${theme.colorText};
      opacity: 1;
    }
  `,
  inputEditable: (theme: ITheme) => css``,
  iconWrapper: css`
    width: 24px;
    height: 24px;
  `,
  span: (theme: ITheme) => css`
    color: ${theme.colorText};
    font-size: 24px;
    min-height: 30px;
    display: flex;
    align-items: center;
    margin-right: 11px;
    min-width: 0;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
  `,
  button: css`
    margin-left: 10px;
  `,
};
