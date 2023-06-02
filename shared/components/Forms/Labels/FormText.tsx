import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { ITheme } from 'types/theme';

const styles = {
  label: (theme: ITheme) => css`
    margin-bottom: 12px;
    font-size: 14px;
    display: flex;
    gap: 8px;
    color: ${theme.colorText};
  `,
};

export const FormText = ({ children }: PropsWithChildren) => (
  <p css={styles.label}>{children}</p>
);
