import { ReactNode } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './AdminSettingsInput.styles';

type AdminSettingsInputProps = {
  label: string;
  description?: string;
  children: ReactNode;
};

export const AdminSettingsInput = ({
  label,
  description,
  children,
}: AdminSettingsInputProps) => {
  return (
    <div css={[styles.form, spacing.top.medium, spacing.bottom.medium]}>
      <div css={styles.labelWrapper}>
        <label css={styles.label}>{label}</label>
        {description ? <span css={styles.labelDesc}>{description}</span> : null}
      </div>
      {children}
    </div>
  );
};
