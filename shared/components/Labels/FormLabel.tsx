import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { ITheme } from 'types/theme';

type Props = {
  isRequired?: boolean;
  isCompact?: boolean;
} & PropsWithChildren;

const styles = {
  label: (theme: ITheme) => css`
    margin-bottom: 12px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${theme.colorLabel};
  `,
  labelCompact: css`
    font-size: 12px;
    margin-bottom: 8px;
  `,
  requiredAsterix: (theme: ITheme) => css`
    display: inline-block;
    color: ${theme.colorDanger};
    transform: translateY(2px);
    font-size: 20px;
  `,
};

export const FormLabel = ({ isRequired, isCompact, children }: Props) => (
  <label css={[styles.label, isCompact && styles.labelCompact]}>
    {children}
    {isRequired && <span css={styles.requiredAsterix}>*</span>}
  </label>
);
