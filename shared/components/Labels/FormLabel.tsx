import { css } from '@emotion/react';
import { SvgIcon } from '@shared/components';
import { PropsWithChildren } from 'react';
import { ITheme } from 'types/theme';
import IconInfo from '@public/assets/icons/common/Info.svg';

type Props = {
  isRequired?: boolean;
  isCompact?: boolean;
  isCapitalized?: boolean;
  hint?: string;
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
  labelCapitalized: css`
    text-transform: capitalize;
  `,
  labelCompact: css`
    font-size: 12px;
    margin-bottom: 8px;
  `,
  requiredAsterix: (theme: ITheme) => css`
    display: inline-block;
    height: 16px;
    margin-top: -2px;
    color: ${theme.colorDanger};
    transform: translateY(2px);
    font-size: 20px;
  `,
};

export const FormLabel = ({
  isRequired,
  isCapitalized,
  isCompact,
  hint,
  children,
}: Props) => (
  <label
    css={[
      styles.label,
      isCompact && styles.labelCompact,
      isCapitalized && styles.labelCapitalized,
    ]}
  >
    {children}
    {isRequired && <span css={styles.requiredAsterix}>*</span>}
    {hint && (
      <>
        {' '}
        <SvgIcon isDefaultColor tooltip={hint}>
          <IconInfo />
        </SvgIcon>
      </>
    )}
  </label>
);
