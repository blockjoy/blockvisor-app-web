import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { ITheme } from 'types/theme';

const styles = {
  label: (theme: ITheme) => css`
    margin-bottom: 12px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${theme.colorLabel};
  `,
};

export const FormLabel = ({ children }: PropsWithChildren) => (
  <label css={styles.label}>{children}</label>
);
