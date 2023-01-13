import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { styles } from './Page.styles';

type LayoutType = {
  children: React.ReactNode;
  isFlex?: boolean;
};

const Page: React.FC<LayoutType> = ({ children, isFlex }) => {
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
