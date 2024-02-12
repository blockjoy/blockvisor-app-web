import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

const styles = {
  error: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    height: 0;
    overflow: hidden;
    font-size: 14px;
    margin-top: 10px;
    color: ${theme.colorDanger};
    will-change: height;
    transition: height 0.3s;
  `,
  errorVisible: css`
    height: 26px;
  `,
};

type Props = {
  isVisible: boolean;
  children: React.ReactNode;
};

export const FormError = ({ children, isVisible }: Props) => (
  <p css={[styles.error, isVisible && styles.errorVisible]}>{children}</p>
);
