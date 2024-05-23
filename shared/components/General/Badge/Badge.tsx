import { SerializedStyles } from '@emotion/serialize';
import { styles } from './Badge.styles';

type Props = {
  color?: 'primary' | 'secondary' | 'note' | 'danger' | 'default';
  style?: 'standard' | 'outline';
  customCss?: SerializedStyles[];
} & React.PropsWithChildren;

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
