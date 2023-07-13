import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
    padding: 0;
    margin: 0;
    gap: 12px;
    width: 100%;

    > div {
      margin-bottom: 0;
    }
  `,
  button: css`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    :disabled {
      pointer-events: none;
    }
  `,

  input: (buttonWidth: string) => (theme: ITheme) =>
    css`
      border: 0;
      background: transparent;
      padding: 0 calc(${buttonWidth} + 10px) 0 0;
      height: 72px;
      width: 100%;
      border-radius: 0;
      border-bottom: 1px solid ${theme.colorBorder};
      opacity: 0.5;
      outline: none;
      color: ${theme.colorText};
      transition: 0.3s;

      :is(:focus, :hover) {
        opacity: 0.7;
        border-bottom-color: ${theme.colorLabel};
      }

      :valid {
        opacity: 1;
      }

      ::placeholder {
        color: ${theme.colorText};
      }
    `,
};
