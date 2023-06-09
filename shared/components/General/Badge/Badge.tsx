import { SerializedStyles } from '@emotion/serialize';
import { ReactNode } from 'react';
import { styles } from './Badge.styles';

type Props = {
  children?: ReactNode;
  color?: 'primary' | 'secondary' | 'note' | 'danger' | 'default';
  style?: 'standard' | 'outline';
  customCss?: SerializedStyles[];
};

export function Badge({ children, color, style, customCss }: Props) {
  return (
    <span
      css={[
        styles.badge,
        styles[color ?? 'primary'],
        styles[style ?? 'standard'],
        customCss && customCss,
      ]}
    >
      {children}
    </span>
  );
}
