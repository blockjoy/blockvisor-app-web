import { styles } from './drawer.styles';

interface Props {
  children: React.ReactNode;
}

export const DrawerContent: React.FC<Props> = ({ children }) => {
  return <div css={styles.content}>{children}</div>;
};
