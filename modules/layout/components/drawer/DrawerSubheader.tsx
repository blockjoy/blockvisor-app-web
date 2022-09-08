import { styles } from './drawer.styles';

type Props = {
  children: React.ReactNode;
};

export const DrawerSubheader: React.FC<Props> = ({ children }) => {
  return <header css={styles.subheader}>{children}</header>;
};
