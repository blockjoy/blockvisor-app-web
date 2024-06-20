import { useRecoilValue } from 'recoil';
import { layoutSelectors } from '@modules/layout';
import { styles } from './Page.styles';

export type PageLayoutType = {
  children: React.ReactNode;
  isFlex?: boolean;
};

const Page = ({ children, isFlex }: PageLayoutType) => {
  const isSidebarOpen = useRecoilValue(layoutSelectors.isSidebarOpen);

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
