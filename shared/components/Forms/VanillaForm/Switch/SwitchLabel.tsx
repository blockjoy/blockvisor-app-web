import { PropsWithChildren } from 'react';
import { SerializedStyles } from '@emotion/react';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './SwitchLabel.styles';
import { ITheme } from 'types/theme';

type Props = {
  label?: string;
  description?: string;
  additionalStyles?:
    | ((theme: ITheme) => SerializedStyles)[]
    | SerializedStyles[];
  additionalLabelStyles?: SerializedStyles[];
} & PropsWithChildren;

export const SwitchLabel = ({
  children,
  label,
  description,
  additionalStyles,
  additionalLabelStyles,
}: Props) => {
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
        <label
          css={[
            styles.label,
            additionalLabelStyles ? additionalLabelStyles : null,
          ]}
        >
          {label}
        </label>
        {description ? <span css={styles.labelDesc}>{description}</span> : null}
      </div>
      {children}
    </div>
  );
};
