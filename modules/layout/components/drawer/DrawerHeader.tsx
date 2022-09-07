import { styles } from './drawer.styles';

interface Props {
  children: React.ReactNode;
}

export const DrawerHeader: React.FC<Props> = ({ children }) => {
  return <header css={styles.header}>{children}</header>;
};
