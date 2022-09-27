import { SerializedStyles } from '@emotion/react';
import { styles } from './SizedIcon.styles';

type Props = {
  children?: React.ReactNode;
  additionalStyles?: SerializedStyles[];
  size: string;
};

const SizedIcon: React.FC<Props> = ({ children, size, additionalStyles }) => (
  <span
    css={[styles.icon, additionalStyles ?? '']}
    style={{ width: size, height: size }}
  >
    {children}
  </span>
);

export default SizedIcon;
