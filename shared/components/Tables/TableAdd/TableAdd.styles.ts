import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
    padding: 0;
    margin: 0;
    gap: 12px;

    > div {
      margin-bottom: 0;
    }
  `,
  button: css`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  `,

  input: (theme: ITheme, buttonWidth: string) => css`
    border: 0;
    background: transparent;
    padding: 0 calc(${buttonWidth} + 10px) 0 0;
    height: 72px;
    width: 100%;
    border-radius: 0;
    border-bottom: 1px solid ${theme.colorBorder};
    opacity: 0.5;
    transition: 0.3s;

    :is(:focus, :hover) {
      opacity: 1;
    }
  `,
};
