import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { useRecoilValue } from 'recoil';
import { styles } from './Page.styles';

export type PageLayoutType = {
  children: React.ReactNode;
  isFlex?: boolean;
};

const Page = ({ children, isFlex }: PageLayoutType) => {
  const isSidebarOpen = useRecoilValue(sidebarOpen);
  return (
    <div
      css={[
        styles.wrapper,
        isFlex && styles.wrapperFlex,
        isSidebarOpen && styles.wrapperSidebarOpen,
      ]}
    >
      {children}
    </div>
  );
};

export default Page;
