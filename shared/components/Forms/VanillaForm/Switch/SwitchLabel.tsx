import { SerializedStyles } from '@emotion/react';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './SwitchLabel.styles';

type SwitchLabelProps = {
  label: string;
  description?: string;
  children: React.ReactNode;
  additionalStyles?: SerializedStyles[];
};

export const SwitchLabel = ({
  label,
  description,
  children,
  additionalStyles,
}: SwitchLabelProps) => {
  return (
    <div
      css={[
        styles.form,
        spacing.top.medium,
        spacing.bottom.medium,
        additionalStyles ? additionalStyles : null,
      ]}
    >
      <div css={styles.labelWrapper}>
        <label css={styles.label}>{label}</label>
        {description ? <span css={styles.labelDesc}>{description}</span> : null}
      </div>
      {children}
    </div>
  );
};
