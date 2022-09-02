import { ReactNode } from 'react';
import { styles } from './PillBox.styles';
import { reset } from 'styles/utils.reset.styles';

type Props = {
  children?: ReactNode;
};
export function PillBox({ children }: Props) {
  return <ul css={[reset.list, styles.pillBox]}>{children}</ul>;
}
