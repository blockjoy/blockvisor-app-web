import { styles } from './drawer.styles';

interface Props {
  children: React.ReactNode;
}

export const DrawerAction: React.FC<Props> = ({ children }) => {
  return <footer css={styles.actions}>{children}</footer>;
};
