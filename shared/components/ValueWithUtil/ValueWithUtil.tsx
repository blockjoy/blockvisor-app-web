import { ReactNode } from 'react';
import { styles } from './ValueWithUtil.styles';

type Props = {
  label?: ReactNode;
  value?: ReactNode;
  children?: ReactNode;
};
export function ValueWithStyles({ label, value, children }: Props) {
  return (
    <article css={[styles.base]}>
      <div>
        {label}
        {value}
      </div>

      <div>{children}</div>
    </article>
  );
}
