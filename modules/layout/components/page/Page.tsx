import { layoutState } from '@modules/layout/store/layoutAtoms';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { styles } from './Page.styles';

type LayoutType = {
  children: React.ReactNode;
};

const Page: React.FC<LayoutType> = ({ children }) => {
  const layout = useRecoilValue(layoutState);

  return (
    <div
      css={[styles.wrapper, layout === 'sidebar' && styles.wrapperSidebarOpen]}
    >
      {children}
    </div>
  );
};

export default Page;
