import { styles } from './drawer.styles';

type Props = {
  children?: React.ReactNode;
  isOpen: boolean;
};

export const Drawer: React.FC<Props> = ({ children, isOpen }) => {
  return <div css={[styles.base, isOpen && styles.isOpen]}>{children}</div>;
};
