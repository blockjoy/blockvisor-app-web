import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
    padding: 0;
    margin: 0;
    gap: 12px;
    width: 100%;
  `,
  addButton: css`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    pointer-events: none;
  `,
  buttons: css`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  confirmButton: css`
    :disabled {
      pointer-events: none;
    }
  `,
  input: (buttonWidth: string) => (theme: ITheme) =>
    css`
      border: 0;
      background: transparent;
      padding: 0 calc(${buttonWidth} + 44px) 0 0;
      height: 72px;
      width: 100%;
      border-radius: 0;
      border-bottom: 1px solid ${theme.colorBorder};
      outline: none;
      color: ${theme.colorText};
      transition: border-bottom-color 0.3s;

      :is(:focus, :hover) {
        opacity: 0.7;
        border-bottom-color: ${theme.colorLabel};
      }

      :valid {
        border-bottom-color: ${theme.colorBorderGrey};
      }

      ::placeholder {
        color: ${theme.colorText};
      }

      :hover {
        cursor: pointer;
      }

      :focus {
        cursor: text;
      }
    `,
};
