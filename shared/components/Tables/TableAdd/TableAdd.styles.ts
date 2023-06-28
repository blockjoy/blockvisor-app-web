import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
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

  input: (theme: ITheme) => css`
    border: 0;
    background: transparent;
    padding: 0 70px 0 0;
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
