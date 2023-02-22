import { SerializedStyles } from '@emotion/react';
import { ITheme } from 'types/theme';
import { styles } from './SizedIcon.styles';

type SizedIconProps = {
  children?: React.ReactNode;
  additionalStyles?: ((theme: ITheme) => SerializedStyles)[];
  size: string;
};

const SizedIcon = ({ children, size, additionalStyles }: SizedIconProps) => (
  <span
    css={[styles.icon, additionalStyles ?? '']}
    style={{ width: size, height: size }}
  >
    {children}
  </span>
);

export default SizedIcon;
