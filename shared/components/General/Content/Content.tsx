import { SubSidebar } from '@shared/components';
import { wrapper } from 'styles/wrapper.styles';
import { styles } from './Content.styles';

type Props = {
  sidebarItems?: SubSidebarItem[];
} & React.PropsWithChildren;

export const Content = ({ children, sidebarItems }: Props) => {
  return (
    <div css={[wrapper.main, styles.wrapper]}>
      <SubSidebar items={sidebarItems} />
      <div css={styles.content}>{children}</div>
    </div>
  );
};
